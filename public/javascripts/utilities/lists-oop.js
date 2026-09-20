function List(localStorageKey) {
  const list = {
    listItems: undefined,
  
    loadFromStorage() {
      this.listItems = JSON.parse(localStorage.getItem(localStorageKey));
    
    if (!this.listItems) {
      this.listItems = [
        {
        productId: '0d7f9qha-4efe-4r89-r0ff-ba8363e0a642',
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: '4d7d7qfa-3tfe-4e48-r06f-ba8353h0w602',
        quantity: 3,
        deliveryOptionId: '2'
      }];
     }
    },
  
    saveToLocalStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.listItems));
    },
  
    addToList(productId) {
      let mathingItem;
    
        this.listItems.forEach((item) => {
          if (productId === item.productId) {
            mathingItem = item;
          }
        });
    
        if (mathingItem) {
          mathingItem.quantity += 1;
        } else {
          this.listItems.push({
            productId: productId,
            quantity: 1,
            deliveryOptionId: '1'
          });  
        } 
    
        this.saveToLocalStorage();
      },
  
      removeList(productId) {
        const newList = [];
  
        this.listItems.forEach((item) => {
          if (item.productId !== productId) {
            newList.push(item);
          }
        });
  
        this.listItems = newList;
        this.saveToLocalStorage();
      },
  
      updateDeliveryOptions (productId, deliveryOptionId) {
        let mathingItem;
      
          this.listItems.forEach((item) => {
            if (productId === item.productId) {
              mathingItem = item;
            }
          });
      
          mathingItem.deliveryOptionId = deliveryOptionId;
      
          this.saveToLocalStorage();
      }
    
  };

  return list;
}

const list = List('list-oop');
const businesslist = List('list-business');

list.loadFromStorage();

businesslist.loadFromStorage();

/* normalizing - an array conists of the products data, then to access it in another page, u just get the productid as it contains the rest of the data, and can save time/complication 

To save the list in localStorage, u need to use it and stringify it as localS only supports strings, while getting it *.getItem() out convert it back by JSON.parse() and set a default value */

/* "this" - is used in JS to point the outer object, coz even if u change the outer obj name, it will still work */

/* OOP - means all the unctions will be inside An obj
OOPS is used to represent real world objs and modifications that can be done into digital Objs
 - makes it more intuitive
 - easy to create multiple objs
 
 = use PascalCase for things that creates objs
 = create a func to create different objs 

Classes - object generator
Classes > to generate objs than functions
 
 When u create a parameter, u need to give it whe calling the function */

/* Classes can be created by,
class {/classname} {
  but instead of colon and comma, use = and ;, like this
  name = obj;

  like normal JS syntax[no colon & comma
  and no parameters]
  the property used stead of parameters should be set values afterwards as it will be initially undefined
} 
  
to create a new obj from class
const varname = new [classname, like List()];
Her, {const varname} is called the instance of the class

Benefits of classes - 
- looks like a obj
- cleaner
- constructors - In JS, it lets the setupCode like {const varname...} inside the class, like this,

constructor(it can have parameters) {}
The set-up code stays in constructor, the call function for the class is the only code that stays out 
shouldn't return anything from the constructor */

/* Private properties of class:
  The properties of the class can be messed from outside the class, so make it private(to be accessed only inside the class), to do that just add #bfore the property
  Private field = private property */

/* .map() - loops through the array and runs code/function for each value and puts the code into a new array

inheritence - let's reuse code b/w classes, like this,
class classname extends parentClass{}

it also let's us use the parent constructor by super()

methodoverriding overrides the parent constructor usually

using a method without knowing the class name {ex: product, it has been used many times, everywhere but the code works } is called polymorphism */

/* Built-in classes:
 Date() - gets the current date and time,
 and it has smtg to give the time - 
 date.toLocalTimeString() 
 but, dayjs() has more features and we always go after the one that has extra features in JS or programming in general 
 
 "this" can be used anywhere in JS
 in functions, 'this' can be used to give value of anything, to do that,
 .call() is used - dont know y tho
 and arrow functions do not change 'this' and it gives the value outside of => func */