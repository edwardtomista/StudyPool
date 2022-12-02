CREATE SCHEMA studypool;

CREATE TABLE studypool.user (
    id varchar(45) NOT NULL PRIMARY KEY,
    email varchar(60) NOT NULL,
    f_name varchar(24),
    l_name varchar(24),
    UNIQUE INDEX (id)
);

CREATE TABLE studypool.userGroup (
    id INT NOT NULL,
    user_id varchar(45) NOT NULL,
    course_id INT NOT NULL
);

CREATE TABLE studypool.studygroup (
   id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    course_id INT NOT NULL,
    title LONGTEXT NOT NULL,
    subject LONGTEXT NOT NULL,
    creator_id varchar(45) NOT NULL,
    creator_name varchar(45) NOT NULL
);

CREATE TABLE studypool.course (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    course_name varchar(24) NOT NULL,
    course_code varchar(10) NOT NULL
);

CREATE TABLE studypool.comment (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,
    user_id varchar(45) NOT NULL,
    comment_date DATETIME NOT NULL,
    content LONGTEXT
);

CREATE TABLE studypool.userPost (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id varchar(45) NOT NULL,
    group_id INT NOT NULL,
    post_date DATETIME NOT NULL,
    content LONGTEXT
);