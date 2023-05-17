select homes.id, homes.title, homes.address, homes.image_main, (select username from accounts where id = homes.account_id) as host, contracts.id, contracts.checkin, contracts.checkout, contracts.total_money, contracts.status, contracts.status_payment, accounts.username from contracts left join homes on contracts.home_id = homes.id left join accounts on contracts.account_id = accounts.id;
select homes.id, homes.title, homes.address, homes.image_main, contracts.id, contracts.checkin, contracts.checkout, contracts.numberOfAdults,contracts.numberOfChildrens, contracts.numberOfInfants, contracts.total_money, contracts.status, contracts.status_payment, accounts.username as user_booking from contracts left join homes on contracts.home_id = homes.id left join accounts on contracts.account_id = accounts.id where contracts.account_id = 2

-- tạo procedure insert home_day
DELIMITER $$
CREATE PROCEDURE insert_ngay (checkin DATE, checkout DATE, contract_id INT, home_id INT)
BEGIN
  DECLARE ngay DATE;
  SET ngay = checkin;
  WHILE ngay <= checkout DO
    INSERT INTO home_days(time, contract_id, home_id) VALUES (ngay, contract_id, home_id);
    SET ngay = DATE_ADD(ngay, INTERVAL 1 DAY);
  END WHILE;
END $$
DELIMITER ;


select homes.id, homes.title, homes.address, homes.image_main, contracts.id, contracts.checkin, contracts.checkout, contracts.total_money, contracts.status, contracts.status_payment, accounts.username, accounts.email, accounts.phone_number from contracts left join homes on contracts.home_id = homes.id left join accounts on contracts.account_id = accounts.id where contracts.id = 5; 
select homes.id, homes.title, homes.address, homes.image_main, contracts.id, contracts.checkin, contracts.checkout, contracts.total_money, contracts.status, contracts.status_payment, accounts.username as user_booking from contracts left join homes on contracts.home_id = homes.id left join accounts on contracts.account_id = accounts.id where contracts.account_id = 10 and DATE(contracts.checkout) > DATE(NOW());
select * from reviews inner join accounts on reviews.account_id = accounts.id; 
select reviews.*, accounts.username, accounts.avatar from (reviews inner join accounts on reviews.account_id = accounts.id) inner join contracts on contracts.id = reviews.contract_id  where reviews.home_id = 7 and contracts.status_review = 1; 
select homes.title, homes.address, contracts.checkin, contracts.checkout, contracts.updated_at, contracts.total_money, contracts.status_payment, contracts.status, accounts.username as user_booking from contracts left join homes on contracts.home_id = homes.id left join accounts on contracts.account_id = accounts.id where homes.account_id = '2' and contracts.home_id='5' and contracts.status_payment != '1' and month(contracts.checkin) >= '4' and year(contracts.checkin) >= '2023' and month(contracts.checkout) <= '5' and year(contracts.checkout) <= '2023';

select categories.id, categories.image, count(categories.id) as amount, categories.name from homes inner join categories on homes.category_id = categories.id group by categories.id;