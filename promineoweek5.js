class Food {
    constructor (mains, sides, drinks) {
        this.mains = mains;
        this.sides = sides;
        this.drinks = drinks;
    }

    describe() {
        return `${this.mains} , ${this.sides} , and this ${this.drinks}`;
    }
}

class Restaurant {
    constructor (name) {
        this.name = name;
        this.foods = [];
    }

    addFood(food) {
        if (food instanceof Food) {
            this.foods.push(food);
        } else {
            throw new Error('You can only make selections from the given menu choices. Please select from the provided foods');
        }
    }

    describe() {
        return `Hello and welcome to ${this.name}! We have ${this.foods.length} different options of food and drink for you to select from!`;
    }
    

}

class MainMenu {
    constructor () {
        this.restaurants = [];
        this.selectedRestaurant = null;
    }

    start() {
        let selection = this.mainMenuOptions();
        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.displayRestaurants();
                    break;
                case '2':
                    this.viewRestaurants();
                    break;
                case '3':
                    this.createRestaurants();
                    break;
                case '4':
                    this.deleteRestaurants();
                    break;
                default:
                     selection = 0;
            }
            selection = this.mainMenuOptions();
        }
        
        alert('Thank you for stopping by!');
    }

    mainMenuOptions() {
        return prompt(`
            0) Exit Menu
            1) Display Restaurants
            2) View Restaurant
            3) Create Restaurant
            4) Delete Restaurant
        `);
    }

    viewRestaurantsMenu(restaurantInfo) {
        return prompt(`
        0) Exit back to Main Menu
        1) Create Food
        2) Delete Food

        ${restaurantInfo}
         `);
    }

    displayRestaurants() {
        let restaurantString = '';
        for (let i = 0; i < this.restaurants.length; i++) {
            restaurantString += i + ') ' + this.restaurants[i].name + '\n';
        }

        alert(restaurantString);
    }


    createRestaurants() {
        let name = prompt('What is the name of your new Restaurant?');
        this.restaurants.push(new Restaurant(name));
    }

    viewRestaurants() {
        let index = prompt('What is the number of the Restaurant you would like to see?');
        if (index > -1 && index < this.restaurants.length) {
            this.selectedRestaurant = this.restaurants[index];
            let displayInfo = 'You have selected:' + " " + this.selectedRestaurant.name + '\n';
            for (let i = 0; i < this.selectedRestaurant.foods.length; i++) {
            displayInfo += i + ') ' + this.selectedRestaurant.foods[i].mains + ' - ' + this.selectedRestaurant.foods[i].sides + ' - ' + 
            this.selectedRestaurant.foods[i].drinks + '\n';
            }

            let selection = this.viewRestaurantsMenu(displayInfo);
            switch (selection) {
                case '1':
                    this.createFood();
                    break;
                case '2':
                    this.deleteFood();
            }
        }    
    }

    deleteRestaurants() {
        let index = prompt('Enter the index of the restaurant you want to delete.');
        if (index > -1 && index < this.restaurants.length) {
            this.restaurants.splice(index, 1);
        }
    }

    createFood() {
        let mains = prompt('Enter your main course');
        let sides = prompt('Enter sides for your meal');
        let drinks = prompt('Enter the drink for your meal');
        this.selectedRestaurant.foods.push(new Food(mains, sides, drinks));
    }

    deleteFood() {
        let index = prompt('Please input the index which of the meal you should like to remove');
        if (index > -1 && index < this.selectedRestaurant.foods.length) {
            this.selectedRestaurant.foods.splice(index, 1);
        }
    }
}
let menu = new MainMenu();
menu.start();
