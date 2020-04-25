create db COVID;
USE covid;
SET GLOBAL local_infile = true;

CREATE TABLE baseinfo 
(
    fips int,
    county varchar(50) NOT NULL,
    state varchar(50) NOT NULL,
    country varchar(50) NOT NULL,
    lastUpdate datetime,
    latitude decimal(12,8),
    longitude decimal(12,8),
    confirmed int(10),
    deaths int(10),
    recovered int(10),
    active int(10),
    combinedKey varchar(200)
);

load data LOCAL infile "/Users/parminderkumar/develop/COVID-19/csse_covid_19_data/csse_covid_19_daily_reports/04-23-2020.csv"
  into table baseinfo COLUMNS TERMINATED BY ','
  OPTIONALLY ENCLOSED BY '"' ESCAPED BY '"'
  LINES TERMINATED BY '\n' IGNORE 1 LINES;
UPDATE USER SET authentication_string= password('password') WHERE user = 'root';
