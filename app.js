let createMealInfoDiv = (meal, mealInput) => {
    let mealPhoto = meal.strMealThumb;
    let mealName = meal.strMeal;
    let mealInfo = `
        <a href="#meal-details-section" style="text-decoration: none; color: black;">
            <div onclick="getMealDetails(${meal.idMeal})" class="card border-0 shadow cursor" style="width: 18rem; border-radius: 10px">
                <img src="${mealPhoto}" class="card-img-top" style="width: 18rem; border-radius: 10px 10px 0 0" alt="...">
                <div class="card-body">
                    <h5 class="card-title text-center">${mealName}</h5>
                </div>
            </div>
        </a>
        `
    let mealInfoSection = document.getElementById('meal-info-section');
    let mealInfoDiv = document.createElement('div');
    mealInfoDiv.className = 'col-xm-1 col-sm-1 col-md-3 p-3 d-flex justify-content-center';
    mealInfoDiv.innerHTML = mealInfo;
    mealInfoSection.appendChild(mealInfoDiv);
}

let showMealInfoDiv = (data, mealInput) => {
    let meal = data.meals;

    if (meal) {
        meal.forEach(element => {
            createMealInfoDiv(element, mealInput);
        });
    }
    else {
        let noMealFound = document.getElementById('no-meal-found');
        noMealFound.innerText = `No meal found for ${mealInput}!`;
    }
}

let searchMeal = () => {
    let mealInput = document.getElementById('meal-input').value;

    if (mealInput) {


        let noMealFound = document.getElementById('no-meal-found');
        noMealFound.innerText = ``;


        let mealInfoSection = document.getElementById('meal-info-section');
        mealInfoSection.innerHTML = ``;


        let mealDetailsSection = document.getElementById('meal-details-section');
        mealDetailsSection.innerHTML = ``;

        let url = `https://www.themealdb.com/api/json/v1/1/search.php?s= ${mealInput}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                showMealInfoDiv(data, mealInput);
            }
            )
    }
    else {
        let noMealFound = document.getElementById('no-meal-found');
        noMealFound.innerText = `You haven't entered anything`;
    }
}

document.getElementById('meal-submit').addEventListener('click', searchMeal);


let showMealDetailsDiv = data => {
    let meal = data.meals[0];
    let mealPhoto = meal.strMealThumb;
    let mealName = meal.strMeal;

    let mealDetailsSection = document.getElementById('meal-details-section');
    mealDetailsSection.innerHTML = `
        <div id="meal-details" class="card px-0 pb-1 border-0 shadow col-xm-12 col-sm-12 col-md-6" style="border-radius: 10px;">
            <img src="${mealPhoto}" class="card-img-top" style="border-radius: 10px 10px 0 0;" alt=" ...">
            <div class="card-body">
                <h2 class="card-title text-center my-3">${mealName}</h2>
                <hr>
                <h5 class="card-title mt-4">Meal Ingredients</h5>
                <div id="meal-ingredients"></div>
            </div>
        </div>
    `
    let mealIngredients = document.getElementById('meal-ingredients');

    for (let i = 1; meal[`strIngredient${i}`]; i++) {
        let ingredients = `
        ✔ ${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}
        `
        let mealDetailsP = document.createElement('p');
        mealDetailsP.className = 'card-text';
        mealDetailsP.innerText = ingredients;
        mealIngredients.appendChild(mealDetailsP);
    }
}

let getMealDetails = mealID => {

    let mealDetailsSection = document.getElementById('meal-details-section');
    mealDetailsSection.innerHTML = ``;

    let url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
    fetch(url)
        .then(res => res.json())
        .then(data => showMealDetailsDiv(data));
}