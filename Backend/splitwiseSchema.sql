CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(250) DEFAULT NULL,
  `email` varchar(250) DEFAULT NULL,
  `password` varchar(250) DEFAULT NULL,
  `phone` varchar(20) DEFAULT 'None',
  `currency` varchar(15) DEFAULT 'USD',
  `timezone` varchar(100) DEFAULT '(GMT-08:00) Pacific Time',
  `language` varchar(35) DEFAULT 'English',
  `user_image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci


CREATE TABLE `groups` (
  `groupId` int NOT NULL AUTO_INCREMENT,
  `groupName` varchar(100) DEFAULT NULL,
  `groupMembers` varchar(100) DEFAULT NULL,
  `isAccepted` varchar(45) DEFAULT 'False',
  `createdBy` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`groupId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `expense` (
  `expenseId` int NOT NULL AUTO_INCREMENT,
  `expDesc` varchar(100) DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `groupName` varchar(100) DEFAULT NULL,
  `paidBy` varchar(100) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isSettleEntry` int DEFAULT '0',
  `paidTo` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`expenseId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci


CREATE TABLE `balanceSummary` (
  `balanceId` int NOT NULL AUTO_INCREMENT,
  `borrower` varchar(50) DEFAULT NULL,
  `pendingAmt` double DEFAULT NULL,
  `payableTo` varchar(50) DEFAULT NULL,
  `groupName` varchar(150) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`balanceId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci


CREATE DEFINER=`admin`@`%` PROCEDURE `insertGroupInLoop`(_createdBy varchar(100), _groupName varchar(100), _members text)
BEGIN

 DECLARE strLen    INT DEFAULT 0;
 DECLARE SubStrLen INT DEFAULT 0;
 DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
      ROLLBACK;
    END;
    START TRANSACTION;
 if not exists (select groupName from dbsplitwise.groups where groupName = _groupName) then
 member_loop:
  LOOP
    SET strLen = CHAR_LENGTH(_members);
   insert into dbsplitwise.groups (groupName, createdBy, groupMembers)
   values(_groupName, _createdBy, SUBSTRING_INDEX(_members, ',', 1));
   
		SET SubStrLen = CHAR_LENGTH(SUBSTRING_INDEX(_members, ',', 1))+2;
		SET _members = MID(_members, SubStrLen, strLen);
                
 IF _members = '' THEN
          LEAVE member_loop;
        END IF;
      END LOOP member_loop;
      
select 'GROUP_ADDED' as status;
else
select 'GROUP_EXISTS' as status;
end if;
  COMMIT;
END


CREATE DEFINER=`admin`@`%` PROCEDURE `updateGroupJoinStatus`(
    _groupName VARCHAR(200),
	_groupMember VARCHAR(200)

)
BEGIN
    
	 if exists (select groupName, isAccepted from dbsplitwise.groups where groupMembers=_groupMember and groupName=_groupName) then
    
    BEGIN
		UPDATE dbsplitwise.groups
		SET isAccepted='True'
		WHERE groupName = _groupName and
		groupMembers=_groupMember;
           
        
		SELECT 'JOINED_GROUP' AS status;
	END;
    ELSE
		SELECT 'NO_RECORD' AS status;
    END IF;
    
END


CREATE DEFINER=`admin`@`%` PROCEDURE `updateUser`(
    _user_id INT,
	_email VARCHAR(250),
    _username VARCHAR(250),    
    _phone VARCHAR(20),
	_currency VARCHAR(50),
	_timezone VARCHAR(100),
	_language VARCHAR(35)
)
BEGIN
    IF _user_id IS NULL THEN
		SELECT id INTO _user_id FROM dbsplitwise.users WHERE email = _email;
	END IF;
    
    IF _user_id IS NOT NULL THEN
    BEGIN
		UPDATE dbsplitwise.users
		SET username = _username, email= _email, phone = _phone, currency=_currency, timezone=_timezone,
		language=_language
		WHERE id = _user_id;
           
        
		SELECT 'USER_UPDATED' AS status;
	END;
    ELSE
		SELECT 'NO_RECORD' AS status;
    END IF;
    
END