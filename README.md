# CRUD API Documentation

This api is built for the Features service of a Zillow Clone application and it allows users to retrieve, insert,update and delete house data. This application uses Knex, a SQL query builder for relational databases, and uses a MYSQL database for this project.

# CRUD Features Endpoints

- GET `/house/features/:id` 
  - Will return json data with the house features  corresponding to the specific id entered by the user.
  - URL Params:
    - Required: id=[integer]

  - Success Response:
    - Status Code: 200
    - Content:
      ``` javascript
       [{
        house_id: 9999990,
        type: 'Single Family',
        year_built: '2002',
        heating: 'Fan',
        cooling: 'Central',
        parking: 'None',
        lot: '80735',
        days_on_zillow: '81',
        price_per_sqft: null }
        ]
        

  - Error Response:
    - Status Code: 400
    - Content:
      ``` javascript
        `House ${id} does not exist`
        
      
  - Sample Call:    
       ```javascript
          $.ajax({
            url: 'http://localhost/house/features/9999990',
            dataType: 'json',
            type : 'GET',
            success : function(data) {
              console.log(data);
            }
          });
        
      
- POST `/house/features` 
  - Will create and insert new house features object into our database, and will return the new feature's id for the object.
  - URL Params:
      - Required: none

  - Success Response:
    - Status Code: 200
    - Content:
      ``` javascript
      `${id}`

  - Error Response:
    - Status Code: 400
    - Content:
      ``` javascript
        'Unable to insert into features due to incorrect params'
      
  - Sample Call:    
      ```javascript
          $.ajax({
            url: 'http://localhost/house/features',
            dataType: 'json',
            type : 'POST',
            data: {
              type: 'Single Family',
              year_built: '1990',
              heating: 'Fan',
              cooling: 'Central',
              parking: 'None',
              lot: '100500',
              days_on_zillow: '34',
              price_per_sqft: null
            },
            success : function(data) {
              console.log(data);
            }
          });
        
- PUT `/house/features/:id`
  - Will update a record with the id and new updated information provided by the user.
  - URL Params:
      - Required: id=[integer]

  - Success Response:
    - Status Code: 200
    - Content:
      ``` javascript
      `feature_${id} was successfully updated`
      
  - Error Response:
    - Status Code: 400
    - Content:
      ``` javascript
      `feature_${id} was not able to updated due to data format error`
          
  - Sample Call:    
      ```javascript
          $.ajax({
            url: 'http://localhost/house/features/10000',
            dataType: 'json',
            type : 'PUT',
            data: {
              year_built: '2000',
            },
            success : function(data) {
              console.log(data);
            }
          });
        
        
- DELETE `/house/features/:id`
  - Will remove a record with the id provided by the user.
  - URL Params:
      - Required: id=[integer]

  - Success Response:
    - Status Code: 200
    - Content:
      ``` javascript
      `feature_${id} was successfully removed`
 
  - Error Response:
    - Status Code: 400
    - Content:
      ``` javascript
         `feature_${id} does not exist, param error`
          
  - Sample Call:    
      ```javascript
          $.ajax({
            url: 'http://localhost/house/features/10000',
            dataType: 'json',
            type : 'DELETE',
            success : function(data) {
              console.log(data);
            }
          });
        
----

# CRUD Interior Endpoints
- GET `/house/interior/:id` 
  - Will return json data with the house interior  corresponding to the specific id entered by the user.
  - URL Params:
    - Required: id=[integer]

  - Success Response:
    - Status Code: 200
    - Content:
      ``` javascript
       [{ feature_id: 9999990,
        bedrooms: '5',
        bathrooms: '3',
        appliances: 'Refrigerator',
        kitchen: 'Eat In Kitchen',
        flooring: '1463',
        house_id: null,
        sqft: '1111' }]

  - Error Response:
    - Status Code: 400
    - Content:
      ``` javascript
        `House ${id} does not exist`
      
  - Sample Call:    
       ```javascript
          $.ajax({
            url: 'http://localhost/house/interior/9999990',
            dataType: 'json',
            type : 'GET',
            success : function(data) {
              console.log(data);
            }
          });

      
- POST `/house/interior` 
  - Will create and insert new house interior object into our database, and will return the new interior's id. 
  - URL Params:
      - Required: none

  - Success Response:
    - Status Code: 200
    - Content:
      ``` javascript
      `${id}`

  - Error Response:
    - Status Code: 400
    - Content:
      ``` javascript
        'Unable to insert into interior due to incorrect params'
      
  - Sample Call:    
      ```javascript
          $.ajax({
            url: 'http://localhost/house/interior',
            dataType: 'json',
            type : 'POST',
            data: {
              bedrooms: '5',
              backyard: '800',
              appliances: 'Refrigerator',
              kitchen: 'Eat In Kitchen',
              flooring: '1234',
              house_id: null,
              sqft: '6000' },
            success : function(data) {
              console.log(data);
            }
          });
      
        
- PUT `/house/interior/:id`
  - Will update a record with the id and new updated information provided by the user.
  - URL Params:
      - Required: id=[integer]
  - Success Response:
    - Status Code: 200
    - Content:
      ``` javascript
      `interior_${id} was successfully updated`
    
  - Error Response:
    - Status Code: 400
    - Content:
      ``` javascript
        `interior_${id} was not able to updated due to data format error`;
         
  - Sample Call:    
      ```javascript
          $.ajax({
            url: 'http://localhost/house/interior/10000',
            dataType: 'json',
            type : 'PUT',
            data: {
              bedrooms: '2',
              bathrooms: '1.5'
            },
            success : function(data) {
              console.log(data);
            }
          });
    
        
- DELETE `/house/interior/:id`
  - Will remove a record with the id provided by the user.
  - URL Params:
      - Required: id=[integer]
  - Success Response:
    - Status Code: 200
    - Content:
      ``` javascript
      `interior_${id} was successfully removed`
      
  - Error Response:
    - Status Code: 400
    - Content:
      ``` javascript
         `feature_${id} does not exist, param error`
       
  - Sample Call:    
      ```javascript
          $.ajax({
            url: 'http://localhost/house/interior/10000',
            dataType: 'json',
            type : 'DELETE',
            success : function(data) {
              console.log(data);
            }
          });
   

  