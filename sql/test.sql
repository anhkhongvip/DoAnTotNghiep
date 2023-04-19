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