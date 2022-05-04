create table users (
	Id serial primary key,
	login varchar(50) not null,
	password varchar(255) not null
);

create table doctors (
	Id serial primary key,
	fullName varchar(50) not null
);

create table orders (
	Id serial primary key,
	patient varchar(50) not null,
	ordersDate date not null,
	complaints text not null,
	usersId integer references users (Id),
	doctorId integer references doctors (Id)
)