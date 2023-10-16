<p align="center">
    <a href=""><img src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" /></a>
    <a href=""><img src="https://badgen.net/github/commits/sabashahbaz/Thrifty" /></a>
    <br>
    <a href=""><img src="https://img.shields.io/badge/React.js-%2361DAFB.svg?style=for-the-badge&logo=react&logoColor=white"/></a>
     <a href=""><img src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
    </a>
    <a href=""><img src="https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white" /></a>
    <br>
    <a href=""><img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" /></a>
       <a href=""><img src="https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white" /></a>
    <a href=""><img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" /></a>

</p>

<h1 align="center"><b>Thrifty</b></h1>
<h4 align="center"> A sophisticated shopping app that integrates the Poshmark API, offering users a seamless platform to purchase and sell second-hand clothing.</h4>

<p align="center">
    <img src="client/src/Assets/thrifty.gif" alt="Project Demo" width=80% height=60%/>
</p>


## Introduction:

Thrifty is a modern web application built to enhance the shopping experience by utilizing the power of the Poshmark Marketplace. Users can effortlessly search for items, explore detailed results, add their own listings for sale all while purchasing products securely. 


## Project Features:
- **User Authentication:** Secure user signup and login functionality utilizing JWT (JSON Web Token)
- **Product Search:** Search for items on Poshmark API with detailed results with images, size of product, description and price.
- **Post Listing:** User can efforlessly post their clothing items for sale
- **Upload Images from file:** User can upload images from their computer for their listing 
- **Edit Existing Listing:** User can edit their existing listing 
- **Personal Wishlist:** Allow users to curate and manage their wishlist.
- **Purchasing Capabilities** Utilizing the Stripe API to allow a safe and user friendly checkout experience 
- **User Logout:** Provide a smooth logout mechanism.

## Installation:
1. Clone this repository to your local machine:

```bash
git clone git@github.com:sabashahbaz/Thrifty.git
```

2. Navigate to the project directory:

```bash
cd Thrifty
```

3. Install the required dependencies using npm install:

Run the back-end server: 

```bash
cd server
```
```bash
npm install express
```

Run the front-end server: 
```bash
cd client
```
```bash
npm install & start 
```


## Upcoming Features:
- Utilization of Ebay API to allow users to compare prices of products in their wishlist
- Search and filter functionality in product search list and wishlist page for enhanced user experience 

## Acknowledgments:
This project originally started as a group collaboration during my time at the Flatiron Software Engineering Boot Camp. My initial team members were Alice Hepburn, Jon Rosenblum and Bushra Yazmin. We used a combination of React, Flask, SQLite, and SQL databases for the project.

However, I decided to take on the challenge of revamping the entire project myself, and I completely restructured it using Node.js and MongoDB, introducing new technologies and a different approach to meet our project goals. Please refer to: https://github.com/sabashahbaz/price-comparison-site, for original product. 

## License:

MIT License

Copyright (c) 2023 Saba Shahbaz

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
