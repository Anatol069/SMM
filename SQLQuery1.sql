-- 1. KILL all connections la database
USE master;
GO

ALTER DATABASE smm_database SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
GO

-- 2. DROP database
DROP DATABASE smm_database;
GO

-- 3. CREATE database fresh
CREATE DATABASE smm_database;
GO

USE smm_database;
GO

-- 4. Users Table
CREATE TABLE Users (
    id INT PRIMARY KEY IDENTITY(1,1),
    username NVARCHAR(50) NOT NULL UNIQUE,
    email NVARCHAR(100) NOT NULL UNIQUE,
    password NVARCHAR(255) NOT NULL,
    profilePicture NVARCHAR(255),
    bio NVARCHAR(500),
    createdAt DATETIME DEFAULT GETDATE(),
    updatedAt DATETIME DEFAULT GETDATE()
);

-- 5. Social Accounts Table
CREATE TABLE SocialAccounts (
    id INT PRIMARY KEY IDENTITY(1,1),
    userId INT NOT NULL,
    platform NVARCHAR(50) NOT NULL,
    accountName NVARCHAR(100) NOT NULL,
    accessToken NVARCHAR(MAX) NOT NULL,
    refreshToken NVARCHAR(MAX),
    followers INT DEFAULT 0,
    isConnected BIT DEFAULT 1,
    createdAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE
);

-- 6. Posts Table
CREATE TABLE Posts (
    id INT PRIMARY KEY IDENTITY(1,1),
    userId INT NOT NULL,
    socialAccountId INT NOT NULL,
    content NVARCHAR(MAX) NOT NULL,
    scheduledTime DATETIME NOT NULL,
    status NVARCHAR(20) DEFAULT 'scheduled',
    likes INT DEFAULT 0,
    comments INT DEFAULT 0,
    shares INT DEFAULT 0,
    views INT DEFAULT 0,
    postUrl NVARCHAR(255),
    createdAt DATETIME DEFAULT GETDATE(),
    updatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE NO ACTION,
    FOREIGN KEY (socialAccountId) REFERENCES SocialAccounts(id) ON DELETE NO ACTION
);

-- 7. Media Table
CREATE TABLE Media (
    id INT PRIMARY KEY IDENTITY(1,1),
    userId INT NOT NULL,
    fileName NVARCHAR(255) NOT NULL,
    fileUrl NVARCHAR(255) NOT NULL,
    fileType NVARCHAR(20) NOT NULL,
    fileSize INT,
    width INT,
    height INT,
    duration INT,
    uploadedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE
);

-- 8. Post_Media Junction Table
CREATE TABLE Post_Media (
    postId INT NOT NULL,
    mediaId INT NOT NULL,
    displayOrder INT DEFAULT 0,
    PRIMARY KEY (postId, mediaId),
    FOREIGN KEY (postId) REFERENCES Posts(id) ON DELETE CASCADE,
    FOREIGN KEY (mediaId) REFERENCES Media(id) ON DELETE NO ACTION
);

-- 9. Analytics Table
CREATE TABLE Analytics (
    id INT PRIMARY KEY IDENTITY(1,1),
    postId INT NOT NULL,
    date DATE NOT NULL,
    likes INT DEFAULT 0,
    comments INT DEFAULT 0,
    shares INT DEFAULT 0,
    views INT DEFAULT 0,
    clicks INT DEFAULT 0,
    engagementRate DECIMAL(5, 2) DEFAULT 0,
    createdAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (postId) REFERENCES Posts(id) ON DELETE CASCADE
);

-- 10. Messages Table
CREATE TABLE Messages (
    id INT PRIMARY KEY IDENTITY(1,1),
    userId INT NOT NULL,
    socialAccountId INT NOT NULL,
    senderName NVARCHAR(100) NOT NULL,
    senderProfile NVARCHAR(255),
    messageText NVARCHAR(MAX) NOT NULL,
    platform NVARCHAR(50) NOT NULL,
    isRead BIT DEFAULT 0,
    receivedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE NO ACTION,
    FOREIGN KEY (socialAccountId) REFERENCES SocialAccounts(id) ON DELETE NO ACTION
);

-- 11. Indexes
CREATE INDEX idx_posts_userId ON Posts(userId);
CREATE INDEX idx_posts_scheduledTime ON Posts(scheduledTime);
CREATE INDEX idx_posts_status ON Posts(status);
CREATE INDEX idx_media_userId ON Media(userId);
CREATE INDEX idx_socialAccounts_userId ON SocialAccounts(userId);
CREATE INDEX idx_analytics_postId ON Analytics(postId);
CREATE INDEX idx_messages_userId ON Messages(userId);
CREATE INDEX idx_messages_socialAccountId ON Messages(socialAccountId);

GO

-- 12. Verify
SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES 
WHERE TABLE_TYPE = 'BASE TABLE'
ORDER BY TABLE_NAME;
GO

PRINT '✅ Database created successfully!';
GO