//budget controller//
var budgetController = (function() {

    var Expense = function(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
    };

    var Income = function(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
    };

    var data = {
      allItems: {
        exp: [],
        inc: []
      },

      totals: {
        exp: 0,
        inc: 0
      }
    };

    return {
        addItem: function(type, des, val) {
            var newItem, ID;

            // create new ID //
            if (data.allItems[type].length > 0) {
                 ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
             } else {
                 ID = 0;
             }


            // create new item based on 'inc' or 'exp' type//
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
              } else if (type === 'inc'){
                newItem = new Income(ID, des, val);
              }

          //push it into ur data structure //
          data.allItems[type].push(newItem);

          // Return the new element //
          return newItem;

        },

        testing: function() {
          console.log(data);
        }
    };

})();



//UI controller //
var UIController = (function() {
  var DOMStrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn'
  };
    return {
      getInput: function() {
        return {
            type: document.querySelector(DOMStrings.inputType).value, // either inc or exp
            description: document.querySelector(DOMStrings.inputDescription).value,
            value: document.querySelector(DOMStrings.inputValue).value
      };
    },

    addListItem: function(obj1, obj2) {
      var html;
      // create html string with placeholder text //
      if (type === 'inc') {
      html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
    } else if (type === 'exp') {
      html = '<div class="item clearfix" id="income-1"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">+ 1,500.00</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
    }

            // replace the placeholder text with real data //
            newHTML = html.replace('%id%', obj.id);
            newHTML = newHtml.replace('%description%', obj.description);
            newHTML = newHtml.replace('%value%', obj.value);

      // Insert the html into the dom //
    },

    getDOMStrings: function() {
      return DOMStrings;
      }

    };

})();

//Global app controller //
var controller = (function(budgetCtrl, UICtrl) {

  var setupEventListeners = function() {
    var DOM = UICtrl.getDOMStrings();

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(e) {
    if (e.keyCode === 13 || e.which === 13) {
      ctrlAddItem();
    }
  });

};




  var ctrlAddItem = function() {
    var input, newItem;
    // grab the input data //
    input = UICtrl.getInput();
    // console.log(input);

    //add the item to budget controller //
    newItem = budgetCtrl.addItem(input.type, input.description, input.value);


    // add the new item to user interface //

    // calculate the budget //

    // display the budget //
  };

  return {
    init: function() {
      console.log('App has started.');
      setupEventListeners();
    }
  };


  })(budgetController, UIController);


controller.init();
