# Restaurant List

 A restaurant list web demo for USER can search for what you want with restaurant name or restaurant category.

## Features
* Login and register for your personal restaurant list.
* Support facebook Login but actually need your personal facebook Dev.  
* Render all restaurant on home page.
* Render detailed restaurant info while click on restaurant card.
* Search restaurant name or category by keyword.
* create new restaurant file with form
* edit restaurant
* delete restaurant that you don't want
* RESTful method design
* Routes
## Screen
![image](https://github.com/eaz73727/Restaurant-List/blob/main/%E8%9E%A2%E5%B9%95%E6%93%B7%E5%8F%96%E7%95%AB%E9%9D%A2%202022-08-27%20201128.jpg)
## Getting started
1. clone files  
 `git clone https://github.com/eaz73727/Restaurant-List`
2. install modules  
`npm install`
3. check .env.example for setting up your global var 
4. run the seeder.js to add the base files  
`npm run seed`
* seeder files
* 8 standard restaurant in restaruant.json
* Login email address:`root@example.com`
* login password: `12345678`
3. run  
 `npm run start`
## modules  
* connect-flash@0.1.1
* dotenv@16.0.1
* express@4.18.1
* express-handlebars@6.0.6
* express-session@1.17.3
* method-override@3.0.0
* mongoose@6.5.2
* passport@0.6.0
* passport-facebook@3.0.0
*passport-local@1.0.0
