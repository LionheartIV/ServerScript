drop database if exists apidatabase;
create database apidatabase;

use apidatabase;

drop table if exists tblapi;

create table tblapi (
	id int not null primary key,
    fullname varchar(48) not null,
    email varchar(48) not null,
    student bit,
    lastupdate timestamp default GETDATE()
);

insert into tblapi 
	(fullname, email, student)
	values ('Adam Adamsen', 'adam@adam.dk', 1),
    ('Bent Bentsen', 'bent@bent.dk', 1),
    ('Ziegelweit B. Zhonk', 'zig@email.dk', 0);
