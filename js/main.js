//budget controller//
var budgetController = (function() {
  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };

  Expense.prototype.calcPercentage = function(totalIncome) {
    if (totalIncome > 0) {
      this.percentage = Math.round((this.value / totalIncome) * 100);
    } else {
      this.percentage = -1;
    }
  };

  Expense.prototype.getPercentage = function() {
    return this.percentage;
  };

  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var calculateTotal = function(type) {
    var sum = 0;
    data.allItems[type].forEach(function(cur) {
      sum += cur.value;
    });

    data.totals[type] = sum;
  };

  var data = {
    allItems: {
      exp: [],
      inc: []
    },

    totals: {
      exp: 0,
      inc: 0
    },

    budget: 0,
    percentage: -1
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
      } else if (type === 'inc') {
        newItem = new Income(ID, des, val);
      }

      //push it into ur data structure //
      data.allItems[type].push(newItem);

      // Return the new element //
      return newItem;
    },

    deleteItem: function(type, id) {
      var ids, index;

      ids = data.allItems[type].map(function(current) {
        return current.id;
      });

      index = ids.indexOf(id);

      if (index !== -1) {
        data.allItems[type].splice(index, 1);
      }
    },

    calculateBudget: function() {
      //calculate total income and expenses//
      calculateTotal('exp');
      calculateTotal('inc');

      //calculate the budget: income minus expenses //
      if (data.totals.inc > 0) {
        data.budget = data.totals.inc - data.totals.exp;
      } else {
        data.percentage = -1;
      }

      //calculate the percentage of income that we spent //
      data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
    },

    calculatePercentages: function() {

      data.allItems.exp.forEach(function(cur) {
        cur.calcPercentage(data.totals.inc);
      });

    },

    getPercentages: function() {
        var allPerc = data.allItems.exp.map(function(cur) {
          return cur.getPercentage();
        });

        return allPerc;
    }

    getBudget: function() {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      };
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
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list',
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expensesLabel: '.budget__expenses--value',
    percentageLabel: '.budget__expenses--percentage',
    container: '.container'
  };

  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMStrings.inputType).value, // either inc or exp
        description: document.querySelector(DOMStrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
      };
    },

    addListItem: function(obj, type) {
      var html, newHTML, element;
      // create html string with placeholder text //
      if (type === 'inc') {
        element = DOMStrings.incomeContainer;

        html =
          '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === 'exp') {
        element = DOMStrings.expensesContainer;

        html =
          '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      // replace the placeholder text with real data //
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', obj.value);

      // Insert the html into the dom //
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },

    deleteListItem: function(selectorID) {
      var el = document.getElementById(selectorID);
      el.parentNode.removeChild(el);

      // if(incomeLabel === 0 && expensesLabel === 0) {
      //   return budgetLabel === 0;
      // }
    },

    // Clear the fields //
    clearFields: function() {
      var fields, fieldsArr;

      fields = document.querySelectorAll(
        DOMStrings.inputDescription + ', ' + DOMStrings.inputValue
      );

      fieldsArr = Array.prototype.slice.call(fields);

      fieldsArr.forEach(function(current, index, array) {
        current.value = '';
      });

      fieldsArr[0].focus();
    },

    displayBudget: function(obj) {
      document.querySelector(DOMStrings.budgetLabel).textContent = obj.budget;
      document.querySelector(DOMStrings.incomeLabel).textContent = obj.totalInc;
      document.querySelector(DOMStrings.expensesLabel).textContent =
        obj.totalExp;

      if (obj.percentage > 0) {
        document.querySelector(DOMStrings.percentageLabel).textContent =
          obj.percentage + '%';
      } else {
        document.querySelector(DOMStrings.percentageLabel).textContent = '---';
      }
    },

    clearFields: function() {
      var fields, fieldsArr;

      fields = document.querySelectorAll(
        DOMStrings.inputDescription + ', ' + DOMStrings.inputValue
      );

      fieldsArr = Array.prototype.slice.call(fields);

      fieldsArr.forEach(function(current, index, array) {
        current.value = '';
      });

      fieldsArr[0].focus();
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

    document
      .querySelector(DOM.container)
      .addEventListener('click', ctrlDeleteItem);
  };

  var updateBudget = function() {
    // calculate the budget //
    budgetCtrl.calculateBudget();

    // return the budget //
    var budget = budgetCtrl.getBudget();

    // display the budget //
    UICtrl.displayBudget(budget);
  };

  var updatePercentages = function() {
    // 1. calculate % //
    budgetCtrl.calculatePercentages();

    // 2. read from budget controller //
    var percentages = budgetCtrl.getPercentages();

    // 3. update the user interface //
    console.log(percentages);
  };

  // add to UI//
  var ctrlAddItem = function() {
    var input, newItem;
    //1.  grab the input data //
    input = UICtrl.getInput();
    // console.log(input);

    //2. add the item to the budget controller //

    if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
      //add the item to budget controller //
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);

      // add the new item to user interface //
      UICtrl.addListItem(newItem, input.type);

      //clear the fields //
      UICtrl.clearFields();

      //Calculate budget//
      updateBudget();

      //Calculate percentages //
      updatePercentages();
    }
  };

  //delete from UI /
  var ctrlDeleteItem = function(e) {
    var itemID, splitID, type, ID;

    itemID = e.target.parentNode.parentNode.parentNode.parentNode.id;

    if (itemID) {
      //inc-1 //
      splitID = itemID.split('-');
      type = splitID[0];
      ID = parseInt(splitID[1]);

      // 1. delete item from data structure //
      budgetCtrl.deleteItem(type, ID);

      //2. delete the item from the user interface //
      UICtrl.deleteListItem(itemID);

      //3. Update and show the new budget //
      updateBudget();

      //4. Calculate and update percentages /
      updatePercentages();
    }

    // console.log(splitID);
  };

  return {
    init: function() {
      console.log('App has started.');
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1
      });
      setupEventListeners();
    }
  };
})(budgetController, UIController);

controller.init();
