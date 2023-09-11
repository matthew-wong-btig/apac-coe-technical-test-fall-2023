# BTIG APAC COE technical test - Full Stack

(version: 8 SEP 2023)

This Technical test will access the basics of software development.

## Disclaimer

- This task is an open book task, you could access any online or offline resources during the test
- Disclaimer: https://www.btig.com/disclaimer.aspx

## General Instruction

- Candidate can complete the task(s) in with ONLY the following **languages**, static files for repository house keeping and dev only scripts are excluded from the restriction.
  - Typescript
  - Python
  - Rust
  - Java
  - C#
- A `README.md` contains following section(s) should be included in submission
  - Package used
  - Getting Start Guides
  - Useful code comments (optional)
  - Comments on task (optional)
- Expected completion time: 3 days
- Open source library can be use if the number of stars on Github > 5k
- The suggested outcome of this technical test is a single Github repository. But if needed, candidate can submit multiple repositories.
- In case of enquiry, please email [BTIGAPCOE@btig.corp](mailto://BTIGAPCOE@btig.corp).

## Submission

1. Create a private Github repository in your Github account.
2. Add `oli@btig.com.hk`, `matthew.wong@btig.com.hk`, and `schan@btig.com.hk` as collaborator.
3. Push code to the Github repository.
4. Notify [BTIGAPCOE@btig.com](mailto://BTIGAPCOE@btig.com) upon submission of the code.
   ​

## Related Knowledge

- Docker
- Backend Development
- Frontend Development
- DBMS
- optimization
- API

## Pre-requesite

Docker is required for this technical test. Please install it before taking the test.

### Docker installation guide

- [Mac](https://docs.docker.com/desktop/install/mac-install/)
- [Windows](https://docs.docker.com/desktop/install/windows-install/)
- [linux](https://docs.docker.com/desktop/install/linux-install/)

### Additional notes (Mac OSX user)

- Mac OSX default APFS file system is case insensitive. this will cause some import operation fail on Windows or Linux. Please make sure the code written is case correct. failure to run code on our testing machine will cause deduction of marks.

## Starting Database

**Please make sure you have the prerequisite completed before proceeding.**

1. Extract the `apac-coe-technical-test-fall-2023-master.zip`
2. Verify the folder content

```shell
# assume this is the folder where apac-coe-technical-test-fall-2023-master.zip reside on your computer
- .zip
- apac-coe-technical-test-fall-2023-master
|- seeder
|- CODEWNERS
|- docker-compose.yml
|- techtest.md
```

3. Change directory to apac-coe-technical-test-fall-2023-master by running `cd apac-coe-technical-test-fall-2023-master` using terminal
4. Verify docker daemon has been started
5. Run `docker-compose up`

# Task 1: Backend API

Build an authenticated REST API for effective retrieval of trade and order data. 

## Objective

- Implement **GetOrder** API
- Implement **GetTrade** API
- All endpoints should be secure by Basic Authentication

## Task 1A: Implement GetOrder API

- The API needs to contain `Authorization` Header for Basic Authentication
- The API should only accept Get request with optional search on at least the following fields:
  - `date`: searching for `Entered_Datetime`
  - `buySell`: searching for `Buy_Sell`
  - `topLevel`: searching for `Top_Level`
  - `ticker`: searching for `Instrument_Code`
  - `counterparty`: searching for `Counterparty_Code`
- The API should only accept arguments in query string but not in request body
- The API should implement `pagination` which accepts `page` and `limit` as parameters
  - `page`: showing results from the nth page, default value =1
  - `limit`: showing n results at a time, default value = 15
- The API should only retrieve the latest version of orders
- The API should return 401 if Authentication is not met
- The API should return 400 if unexpected data is entered as parameters
  - e.g. `date` is not a valid date
  - e.g. `buySell` is neither `"B"` or `"S"`
  - e.g. `topLevel` is neither `"Y"` or `"N"`
- The API should return 404 if nothing is found for the query
- The API should return 500 if any error encountered

### Sample Request
```jsonc 
GET /api/getOrder?date=2023-01-01&buySell=B
GET /api/getOrder?topLevel=Y&page=2&limit=10
```
### Sample Response

```jsonc
//sample 200 response
{
  "status": 400,
  "pagination": {
   "total": 100,
   "currentPage": 1,
   "totalPages": 10,
   "nextPage": 2,
   "prevPage": null
  },
  "data": [
    {
      ...
    },
    {
      ...
    },
    {
      ...
    }
  ],
  "timestamp": "2023-09-01T08:41:48.066Z"
}
```

```jsonc
//sample 400 response
{
  "status": 400,
  "data": "Bad Request",
  "timestamp": "2023-09-01T08:41:48.066Z"
}
```

```jsonc
//sample 401 response
{
  "status": 401,
  "data": "Unauthorized",
  "timestamp": "2023-09-01T08:41:48.066Z"
}
```

```jsonc
//sample 404 response
{
  "status": 404,
  "data": [],
  "timestamp": "2023-09-01T08:41:48.066Z"
}
```

## Task 1B: implement GetTrade API

- The API needs to contain `Authorization` Header for Basic Authentication
- The API should only accept Get request with optional search on at least the following fields:
  - `date`: searching for `Trade_Datetime`
  - `buySell`: searching for `Buy_Sell`
  - `ticker`: searching for `Instrument_Code`
  - `counterparty`: searching for `Counterparty`
  - `sedol`: searching for `Sedol_Code`
- The API should only accept arguments in query string but not in request body
- The API should implement `pagination` which accepts `page` and `limit` as parameters
  - `page`: showing results from the nth page, default value =1
  - `limit`: showing n results at a time, default value = 15
- The API should only retrieve the latest version of trades
- The API should return 401 if Authentication is not met
- The API should return 400 if unexpected data is entered as parameters
  - e.g. `date` is not a valid date
  - e.g. `buySell` is neither `"B"` or `"S"`
- The API should return 404 if nothing is found for the query
- The API should return 500 if any error encountered

### Sample Request
```jsonc 
GET /api/getTrade?date=2023-01-01&sedol=2001119
GET /api/getTrade?buySell=B&page=2&limit=10
```

### sample response

```jsonc
//sample 200 response
{
  "status": 400,
  "pagination": {
   "total": 100,
   "currentPage": 1,
   "totalPages": 10,
   "nextPage": 2,
   "prevPage": null
  },
  "data": [
    {
      ...
    },
    {
      ...
    },
    {
      ...
    }
  ],
  "timestamp": "2023-09-01T08:41:48.066Z"
}
```

```jsonc
//sample 400 response
{
  "status": 400,
  "data": "Bad Request",
  "timestamp": "2023-09-01T08:41:48.066Z"
}
```

```jsonc
//sample 401 response
{
  "status": 401,
  "data": "Unauthorized",
  "timestamp": "2023-09-01T08:41:48.066Z"
}
```

```jsonc
//sample 404 response
{
  "status": 404,
  "data": [],
  "timestamp": "2023-09-01T08:41:48.066Z"
}
```

# Task 2: Frontend Application

Build an web application with blotters for business users.

## Objective

- Create a web application
- Create a login page for user
- Create a Component for display and filtering Order data
- Create a Component for display and filtering Trade data

## Task 2A: Login

- Build a form for user to login and the login should be valid for 5 minutes only.
- Users should only be able to access the APIs after logging in. 

## Task 2B: Order Blotter

- Build a blotter with the data retrieved by the **getOrder** API that you just made. Display the data in datagrid or table. 
- Implement UI elements to filter orders including but not limited to the following fields:
  - `Entered_Datetime`
  - `Buy_Sell`
  - `Top_Level`
  - `Instrument_Code`
  - `Counterparty_Code`
- Make use of serverside pagination

## Task 2C: Trade Blotter

- Build a blotter with the data retrieved by the **getTrade** API that you just made. Display the data in datagrid or table.
- Implement UI elements to filter trades including but not limited to the following fields:
  - `Entered_Datetime`
  - `Buy_Sell`
  - `Entered_By`
  - `Instrument_Code`
  - `Counterparty_Code`
- Make use of serverside pagination

## Task 2 Bonus

- Provide text search or auto completion on some of the searching fields
- Responsively update data on user input changes without clicking a search button. The update process shall not block the rendering of the user input.

# Task 3: Analytics

Build a dashboard for analytic purposes on your web application that you have just made. If you prefer to make use of other data visualization tools, make sure to provide instructions on how could we access your dashboard. 

## Objective

- Design a dashboard that contains a stacked barchart with at least 1 view:

1. per Trader **expected commission** (commission calculated based on order) and **traded commission** (commission calculated based on trade)
2. (Bonus) per Instrument **expected commission** (commission calculated based on order) and **traded commission** (commission calculated based on trade)
3. (Bonus) per Client **expected commission** (commission calculated based on order) and **traded commission** (commission calculated based on trade)


# Overall bonus

- adopt monorepo structure
- add unit test for your function
- add other charts and figures in your dashboard with clear interpretation of data
- sophisticated and flexible blotter design
- ability to handle concurrent connections without dropping of speed
- add any other add-ons that could fulfill the potential needs of business users

# References

- assume all currency is USD if not explicitly specified
- 1bps = 0.01%

## Order Table

```sql
-- techtest.Orders definition
-- mysql

CREATE TABLE `Orders` (
  `Order_State` varchar(50) DEFAULT NULL,
  `Executing_Entity` varchar(50) DEFAULT NULL,
  `Contracting_Entity` varchar(50) DEFAULT NULL,
  `Instrument_Code` varchar(50) DEFAULT NULL,
  `Instrument_Description` varchar(500) DEFAULT NULL,
  `ISIN_Code` varchar(50) DEFAULT NULL,
  `Sedol_Code` varchar(50) DEFAULT NULL,
  `Market_Id` varchar(50) DEFAULT NULL,
  `Counterparty_Code` varchar(50) DEFAULT NULL,
  `Counterparty_Description` varchar(500) DEFAULT NULL,
  `Top_Level` varchar(50) DEFAULT NULL,
  `Order_id` varchar(50) NOT NULL,
  `Version` int(11) NOT NULL,
  `Buy_Sell` varchar(50) DEFAULT NULL,
  `Total_Quantity` decimal(28,14) DEFAULT NULL,
  `Quantity_Field` decimal(28,14) DEFAULT NULL,
  `Limit_Price` decimal(28,14) DEFAULT NULL,
  `Gross_Fill_Price` decimal(28,14) DEFAULT NULL,
  `Dealt_Ccy` varchar(50) DEFAULT NULL,
  `Settlement_Ccy` varchar(50) DEFAULT NULL,
  `Dealt_To_Settlement_Rate` decimal(28,14) DEFAULT NULL,
  `Amended_Datetime` datetime DEFAULT NULL,
  `Representative_Id` varchar(50) DEFAULT NULL,
  `Num_Fills` varchar(50) DEFAULT NULL,
  `Entered_Datetime` datetime DEFAULT NULL,
  `Settlement_Datetime` datetime DEFAULT NULL,
  `Commission_Type` varchar(50) DEFAULT NULL,
  `Commission_Value` decimal(28,14) DEFAULT NULL,
  `Buy_Sell_Qualifier` varchar(50) DEFAULT NULL,
  `Root_Order_Id` varchar(50) DEFAULT NULL,
  `Quantity_Available` decimal(28,14) DEFAULT NULL,
  `Quantity_Filled_Today` decimal(28,14) DEFAULT NULL,
  `Order_Flags` varchar(100) DEFAULT NULL,
  `Last_Complete_Datetime` datetime DEFAULT NULL,
  `Account_Code` varchar(50) DEFAULT NULL,
  `Order_Notes` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`Order_id`,`Version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

## Trade Table

```sql
-- techtest.Trades definition
-- mysql
CREATE TABLE `Trades` (
  `Record_Type` varchar(50) NOT NULL,
  `State` varchar(50) DEFAULT NULL,
  `Buy_Sell` varchar(50) DEFAULT NULL,
  `Quantity` decimal(28,14) DEFAULT NULL,
  `Instrument_Code` varchar(50) DEFAULT NULL,
  `Isin_Code` varchar(50) DEFAULT NULL,
  `Sedol_Code` varchar(50) DEFAULT NULL,
  `Exchange_Id` varchar(50) DEFAULT NULL,
  `Gross_Price` decimal(28,14) DEFAULT NULL,
  `Gross_Consideration` decimal(28,14) DEFAULT NULL,
  `Counterparty` varchar(50) DEFAULT NULL,
  `Trade_Datetime` datetime DEFAULT NULL,
  `Trade_Id` varchar(50) NOT NULL,
  `Version_Number` int(10) NOT NULL,
  `Settlement_Datetime` datetime DEFAULT NULL,
  `Dealt_Ccy` varchar(50) DEFAULT NULL,
  `Order_Id` varchar(50) DEFAULT NULL,
  `Entered_By` varchar(50) DEFAULT NULL,
  `Exchange_Trade_Code` varchar(50) DEFAULT NULL,
  `Trader` varchar(50) DEFAULT NULL,
  `Trade_Flags` varchar(50) DEFAULT NULL,
  `Sub_Account` varchar(50) DEFAULT NULL,
  `Notes` varchar(500) DEFAULT NULL,
  `Instrument_Id` varchar(50) DEFAULT NULL,
  `Counterparty_Id` varchar(50) DEFAULT NULL,
  `Account_Id` varchar(50) DEFAULT NULL,
  `Entered_Datetime` datetime DEFAULT NULL,
  `Commission_Type` varchar(50) DEFAULT NULL,
  `Commission_Value` decimal(28,14) DEFAULT NULL,
  `Trading_Entity_Id` varchar(50) DEFAULT NULL,
  `Amended_Datetime` datetime DEFAULT NULL,
  `Execution_Venue` varchar(50) DEFAULT NULL,
  `Order_Price_Type` varchar(50) DEFAULT NULL,
  `Root_Order_Id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Trade_Id`,`Version_Number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```