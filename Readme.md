# 2048-chem

### Project Brief 

MVP - Minimum Viable Product

Built with HTML, CSS and JavaScript (jQuery is strongly optional)
Use Javascript for DOM manipulation
Hosted on Github pages
Commits to Github frequently
A README.md file with explanations of the technologies used, the approach taken, a link to your live site, installation instructions, unsolved problems, etc.
Be displayed in the browser
Have some kind of user interaction via mouseclick or keypress

### Timeframe
1 week

### Technologies & Tools Used
* HTML
* CSS
* JavaScript
* Git & GitHub
* Vite

### Description
This is a well-loved 2048 game with a chemistry twist to it. The game was designed and implemented using HTML, CSS, and Javascript while attending the Software Engineering Immersive course at General Assembly.

After sinking many hours into the game 2048 when I was younger, I wanted to build a 2048 game with a science twist to it. I want to include my love for science to the game I love (even up to now). 2048 is a single-player sliding block puzzle game designed by Italian web developer Gabriele Cirulli. The game’s objective is to slide numbered tiles on a grid to combine them to create a tile with the number 2048. 

In this game, instead of combining numbers, you will combine elements to get the next element from the periodic table. Through this game, you will get familiar with the first 40 elements of the periodic table. 

### Deployment
The game is deployed on GitHub pages, and you can play the game here: 
* https://github.com/Daya-goh/2048-chem
* https://2048-chem-daya-goh.vercel.app

### How To Play
Use your arrow keys to move the tiles. Tiles with the same element merge into one when they touch. Add them up to reach the element Zirconium[40]!

<img width="566" alt="image" src="https://user-images.githubusercontent.com/108121984/184097289-eec3fbd6-ff10-435a-8e1e-4408bf65d023.png">


### WireFrame

Before coding the game, I planned out the design and the possible logic for the game. This helps to break down the project into manageable parts and also plan out the possible codes/functions needed. 

<img width="1170" alt="Screenshot 2022-08-11 at 4 54 47 PM" src="https://user-images.githubusercontent.com/108121984/184098402-9f5dc87c-73a7-46d1-a2a0-1e4546a39b55.png">

<img width="1185" alt="Screenshot 2022-08-11 at 5 11 41 PM" src="https://user-images.githubusercontent.com/108121984/184101368-dba27b3c-3bd0-4021-8501-d2b1a0b53c9d.png">

### Crux of the project

For this game, the crux of the game is the movement and merging of the tiles. It can be broadly broken down into 4 steps.
For each array (loops):
* Remove the zeros from the array (using filter method)
* Check for tiles with similar values (conditional) and merge the tiles
* Remove the zeros from the array again (using filter method)
* Adding zeros to the array (push or unshift) depending on the direction of shift.

Initially, I approached the shifting of the tiles using the appending and reappending of divs methods. It was complicated and difficult to track. After encountering many problems, I had to re-evaluate my approach and research on possible ways to shift the tiles. After many attempts, I finally chanced upon an idea that is suitable for the game. It was systematic and straightforward to track the different tiles. 

<img width="816" alt="Screenshot 2022-08-11 at 5 23 56 PM" src="https://user-images.githubusercontent.com/108121984/184103320-0eb7d45f-3a5c-40e3-9e7a-cf68481d0ea4.png">

<img width="653" alt="Screenshot 2022-08-11 at 5 27 00 PM" src="https://user-images.githubusercontent.com/108121984/184103916-00765a61-5774-47cf-9e29-54796e201564.png">

<img width="649" alt="sliding code part 2" src="https://user-images.githubusercontent.com/108121984/184121674-0b925803-c8d0-4f07-bca3-3f776e1166e2.png">

![My Video](https://user-images.githubusercontent.com/108121984/184256970-a814fedb-2412-41a9-bd5e-358521ff9bf8.gif)


### Key Learning and AFI

#### Approach and Process
For this project, I approached the game from a top down approach, building the game like how the user would use the web application. As such problems and bugs compounded and I was not able to work on the crux of the project. In the end, I had to rebuild my project from scratch. Learning from this experience, I will break down the project more and find the crux of the project and work on them before working on the other parts (aesthetics and user interface). 

#### Code and Code Design
This game is based on a grid board design and hence I have a gameboard array to represent the tiles. I had to write 2 loops for each check through the gameboard and it is quite repetitve. Next time, I would research on other ways (such as .flat method) to check through the board without looping through the arrays repeatedly.

<img width="331" alt="Screenshot 2022-08-11 at 6 59 41 PM" src="https://user-images.githubusercontent.com/108121984/184119186-09ae4461-700d-48e6-be25-db053242afb7.png">

<img width="798" alt="Screenshot 2022-08-11 at 7 00 11 PM" src="https://user-images.githubusercontent.com/108121984/184119232-e8941523-76ca-4455-80d1-ba6f3a89ee0a.png">

#### SEI Post Mortem
As part of what I have learned, I modularised my code by using functions for repeated lines of code. It helped to organise the codes into readable sections for maintaining and debugging. For this game, I needed to create many elements, and learning about the class methods was really helpful as it made the process of creating 40 elements more systematic.

<img width="843" alt="Screenshot 2022-08-11 at 7 01 07 PM" src="https://user-images.githubusercontent.com/108121984/184119428-f519260b-a4fa-40d0-af85-d9afe4d539f9.png">
