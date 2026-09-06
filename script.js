/* =========================================================
   ENGLISH ADVENTURE
   FULL GAME JAVASCRIPT
   100 QUESTIONS
   10 WORLDS × 10 QUESTIONS

   FEATURES:
   - Random question order
   - Random answer order
   - Click sound
   - Correct sound
   - Wrong sound
   - Level-up sound
   - Finish sound
========================================================= */


/* =========================================================
   GAME DATA
========================================================= */

const GAME_KEY = "englishAdventureSave_v1";


/* =========================================================
   PLAYER
========================================================= */

let player = {
    name: "English Hero",
    level: 1,
    exp: 0,
    coins: 0,
    hp: 100,

    unlockedWorld: 1,

    worldStars: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0
    },

    totalCorrect: 0,
    totalQuestions: 0,
    bestStreak: 0,

    achievements: [],

    dailyRewardClaimed: false,
    lastRewardDate: "",

    sound: true,
    music: true
};


/* =========================================================
   GAME STATE
========================================================= */

let currentWorld = 1;
let currentQuestionIndex = 0;

let currentQuestions = [];

let currentScore = 0;
let currentCorrect = 0;
let currentWrong = 0;

let currentStreak = 0;

let questionAnswered = false;


/* =========================================================
   RANDOMIZED ANSWER STATE
========================================================= */

let shuffledAnswers = [];
let currentCorrectAnswerIndex = 0;


/* =========================================================
   WORLD DATA
========================================================= */

const worlds = {

    1: {
        title: "Forest of Words",
        description: "Animals & Colors",
        icon: "🌳"
    },

    2: {
        title: "Happy School",
        description: "School Vocabulary",
        icon: "🏫"
    },

    3: {
        title: "My Little Home",
        description: "Family & House",
        icon: "🏠"
    },

    4: {
        title: "Food Village",
        description: "Food & Drinks",
        icon: "🍎"
    },

    5: {
        title: "Weather Valley",
        description: "Weather & Nature",
        icon: "🌦️"
    },

    6: {
        title: "City Life",
        description: "Places & Directions",
        icon: "🏙️"
    },

    7: {
        title: "Time Village",
        description: "Time & Daily Activities",
        icon: "⏰"
    },

    8: {
        title: "Grammar Forest",
        description: "Basic Grammar",
        icon: "🧙"
    },

    9: {
        title: "Kingdom of Sentences",
        description: "Sentence Challenge",
        icon: "🏰"
    },

    10: {
        title: "Dragon of English",
        description: "Final English Challenge",
        icon: "🐉"
    }

};


/* =========================================================
   100 QUESTIONS
========================================================= */

const questions = [

    /* WORLD 1 */

    {
        world: 1,
        image: "🐱",
        category: "VOCABULARY",
        question: "What animal is this?",
        answers: ["Cat", "Dog", "Fish", "Bird"],
        correct: 0,
        explanation: "This is a cat."
    },

    {
        world: 1,
        image: "🐶",
        category: "VOCABULARY",
        question: "What animal is this?",
        answers: ["Lion", "Dog", "Rabbit", "Cow"],
        correct: 1,
        explanation: "This is a dog."
    },

    {
        world: 1,
        image: "🦁",
        category: "VOCABULARY",
        question: "What animal is this?",
        answers: ["Tiger", "Bear", "Lion", "Horse"],
        correct: 2,
        explanation: "This is a lion."
    },

    {
        world: 1,
        image: "🐟",
        category: "VOCABULARY",
        question: "What animal is this?",
        answers: ["Bird", "Fish", "Cat", "Duck"],
        correct: 1,
        explanation: "This is a fish."
    },

    {
        world: 1,
        image: "🐰",
        category: "VOCABULARY",
        question: "What animal is this?",
        answers: ["Rabbit", "Monkey", "Dog", "Tiger"],
        correct: 0,
        explanation: "This is a rabbit."
    },

    {
        world: 1,
        image: "🔴",
        category: "COLORS",
        question: "What color is this?",
        answers: ["Blue", "Green", "Red", "Yellow"],
        correct: 2,
        explanation: "The color is red."
    },

    {
        world: 1,
        image: "🔵",
        category: "COLORS",
        question: "What color is this?",
        answers: ["Blue", "Red", "Black", "Green"],
        correct: 0,
        explanation: "The color is blue."
    },

    {
        world: 1,
        image: "🟢",
        category: "COLORS",
        question: "What color is this?",
        answers: ["Yellow", "Green", "Pink", "Blue"],
        correct: 1,
        explanation: "The color is green."
    },

    {
        world: 1,
        image: "🟡",
        category: "COLORS",
        question: "What color is this?",
        answers: ["Purple", "Black", "Yellow", "Red"],
        correct: 2,
        explanation: "The color is yellow."
    },

    {
        world: 1,
        image: "🐼",
        category: "VOCABULARY",
        question: "Which animal is black and white?",
        answers: ["Panda", "Lion", "Horse", "Fish"],
        correct: 0,
        explanation: "A panda is usually black and white."
    },


    /* WORLD 2 */

    {
        world: 2,
        image: "📚",
        category: "SCHOOL",
        question: "What is this?",
        answers: ["Book", "Chair", "Bag", "Pen"],
        correct: 0,
        explanation: "This is a book."
    },

    {
        world: 2,
        image: "✏️",
        category: "SCHOOL",
        question: "What do you use to write?",
        answers: ["Pencil", "Table", "Door", "Clock"],
        correct: 0,
        explanation: "We use a pencil to write."
    },

    {
        world: 2,
        image: "🎒",
        category: "SCHOOL",
        question: "What is this?",
        answers: ["School bag", "Notebook", "Ruler", "Board"],
        correct: 0,
        explanation: "This is a school bag."
    },

    {
        world: 2,
        image: "📏",
        category: "SCHOOL",
        question: "What do you use to measure?",
        answers: ["Ruler", "Pencil", "Book", "Eraser"],
        correct: 0,
        explanation: "A ruler is used to measure."
    },

    {
        world: 2,
        image: "🧑‍🏫",
        category: "SCHOOL",
        question: "Who teaches students?",
        answers: ["Teacher", "Doctor", "Farmer", "Pilot"],
        correct: 0,
        explanation: "A teacher teaches students."
    },

    {
        world: 2,
        image: "🏫",
        category: "SCHOOL",
        question: "Where do students study?",
        answers: ["Hospital", "School", "Market", "Airport"],
        correct: 1,
        explanation: "Students study at school."
    },

    {
        world: 2,
        image: "🪑",
        category: "SCHOOL",
        question: "What do you sit on?",
        answers: ["Chair", "Book", "Pen", "Bag"],
        correct: 0,
        explanation: "You sit on a chair."
    },

    {
        world: 2,
        image: "🧽",
        category: "SCHOOL",
        question: "What can remove pencil marks?",
        answers: ["Eraser", "Ruler", "Chair", "Bag"],
        correct: 0,
        explanation: "An eraser removes pencil marks."
    },

    {
        world: 2,
        image: "📓",
        category: "SCHOOL",
        question: "Where can you write notes?",
        answers: ["Notebook", "Window", "Door", "Clock"],
        correct: 0,
        explanation: "You can write notes in a notebook."
    },

    {
        world: 2,
        image: "🖊️",
        category: "SCHOOL",
        question: "Which one is used for writing?",
        answers: ["Pen", "Shoes", "Plate", "Ball"],
        correct: 0,
        explanation: "A pen is used for writing."
    },


    /* WORLD 3 */

    {
        world: 3,
        image: "👨",
        category: "FAMILY",
        question: "Who is your father's male parent?",
        answers: ["Brother", "Grandfather", "Uncle", "Cousin"],
        correct: 1,
        explanation: "Your father's father is your grandfather."
    },

    {
        world: 3,
        image: "👩",
        category: "FAMILY",
        question: "What do we call a female parent?",
        answers: ["Mother", "Sister", "Aunt", "Daughter"],
        correct: 0,
        explanation: "A female parent is a mother."
    },

    {
        world: 3,
        image: "👦",
        category: "FAMILY",
        question: "What is a male child called?",
        answers: ["Boy", "Girl", "Woman", "Mother"],
        correct: 0,
        explanation: "A male child is a boy."
    },

    {
        world: 3,
        image: "🏠",
        category: "HOUSE",
        question: "Where do people live?",
        answers: ["House", "School", "Airport", "Library"],
        correct: 0,
        explanation: "People can live in a house."
    },

    {
        world: 3,
        image: "🛏️",
        category: "HOUSE",
        question: "Where do you sleep?",
        answers: ["Bed", "Table", "Kitchen", "Garden"],
        correct: 0,
        explanation: "You sleep in a bed."
    },

    {
        world: 3,
        image: "🍳",
        category: "HOUSE",
        question: "Where do people cook?",
        answers: ["Kitchen", "Bedroom", "Bathroom", "Garage"],
        correct: 0,
        explanation: "People cook in the kitchen."
    },

    {
        world: 3,
        image: "🚿",
        category: "HOUSE",
        question: "Where do you take a shower?",
        answers: ["Bathroom", "Kitchen", "Garden", "Bedroom"],
        correct: 0,
        explanation: "You take a shower in the bathroom."
    },

    {
        world: 3,
        image: "🛋️",
        category: "HOUSE",
        question: "What is this?",
        answers: ["Sofa", "Bed", "Door", "Window"],
        correct: 0,
        explanation: "This is a sofa."
    },

    {
        world: 3,
        image: "🚪",
        category: "HOUSE",
        question: "What do you open to enter a room?",
        answers: ["Door", "Roof", "Floor", "Wall"],
        correct: 0,
        explanation: "You open a door to enter."
    },

    {
        world: 3,
        image: "🪟",
        category: "HOUSE",
        question: "What lets you see outside?",
        answers: ["Window", "Floor", "Roof", "Bed"],
        correct: 0,
        explanation: "A window lets you see outside."
    },


    /* WORLD 4 */

    {
        world: 4,
        image: "🍎",
        category: "FOOD",
        question: "What fruit is this?",
        answers: ["Apple", "Banana", "Orange", "Grape"],
        correct: 0,
        explanation: "This is an apple."
    },

    {
        world: 4,
        image: "🍌",
        category: "FOOD",
        question: "What fruit is yellow?",
        answers: ["Banana", "Apple", "Grape", "Watermelon"],
        correct: 0,
        explanation: "A banana is usually yellow."
    },

    {
        world: 4,
        image: "🍊",
        category: "FOOD",
        question: "What fruit is orange?",
        answers: ["Orange", "Apple", "Pear", "Banana"],
        correct: 0,
        explanation: "This is an orange."
    },

    {
        world: 4,
        image: "🍇",
        category: "FOOD",
        question: "What fruit is shown?",
        answers: ["Grape", "Apple", "Banana", "Lemon"],
        correct: 0,
        explanation: "These are grapes."
    },

    {
        world: 4,
        image: "🍉",
        category: "FOOD",
        question: "What fruit is large and green outside?",
        answers: ["Watermelon", "Apple", "Cherry", "Grape"],
        correct: 0,
        explanation: "A watermelon is large and green outside."
    },

    {
        world: 4,
        image: "🍚",
        category: "FOOD",
        question: "What food is this?",
        answers: ["Rice", "Bread", "Cake", "Soup"],
        correct: 0,
        explanation: "This is rice."
    },

    {
        world: 4,
        image: "🍞",
        category: "FOOD",
        question: "What is this?",
        answers: ["Bread", "Rice", "Fish", "Egg"],
        correct: 0,
        explanation: "This is bread."
    },

    {
        world: 4,
        image: "🥚",
        category: "FOOD",
        question: "What is this?",
        answers: ["Egg", "Apple", "Cheese", "Rice"],
        correct: 0,
        explanation: "This is an egg."
    },

    {
        world: 4,
        image: "🥛",
        category: "DRINKS",
        question: "What drink is this?",
        answers: ["Milk", "Juice", "Water", "Tea"],
        correct: 0,
        explanation: "This is milk."
    },

    {
        world: 4,
        image: "💧",
        category: "DRINKS",
        question: "What do we drink to stay hydrated?",
        answers: ["Water", "Bread", "Rice", "Cake"],
        correct: 0,
        explanation: "Water helps keep us hydrated."
    },


    /* WORLD 5 */

    {
        world: 5,
        image: "☀️",
        category: "WEATHER",
        question: "What weather is this?",
        answers: ["Sunny", "Rainy", "Snowy", "Windy"],
        correct: 0,
        explanation: "The weather is sunny."
    },

    {
        world: 5,
        image: "🌧️",
        category: "WEATHER",
        question: "What weather has rain?",
        answers: ["Rainy", "Sunny", "Snowy", "Hot"],
        correct: 0,
        explanation: "Rainy weather has rain."
    },

    {
        world: 5,
        image: "❄️",
        category: "WEATHER",
        question: "What is frozen water called?",
        answers: ["Snow", "Rain", "Wind", "Cloud"],
        correct: 0,
        explanation: "Frozen water can form snow."
    },

    {
        world: 5,
        image: "💨",
        category: "WEATHER",
        question: "What is moving air called?",
        answers: ["Wind", "Rain", "Snow", "Sun"],
        correct: 0,
        explanation: "Moving air is called wind."
    },

    {
        world: 5,
        image: "☁️",
        category: "WEATHER",
        question: "What is this?",
        answers: ["Cloud", "River", "Mountain", "Tree"],
        correct: 0,
        explanation: "This is a cloud."
    },

    {
        world: 5,
        image: "🌳",
        category: "NATURE",
        question: "What is this?",
        answers: ["Tree", "Flower", "Rock", "River"],
        correct: 0,
        explanation: "This is a tree."
    },

    {
        world: 5,
        image: "🌸",
        category: "NATURE",
        question: "What is this?",
        answers: ["Flower", "Tree", "Cloud", "Stone"],
        correct: 0,
        explanation: "This is a flower."
    },

    {
        world: 5,
        image: "⛰️",
        category: "NATURE",
        question: "What is this?",
        answers: ["Mountain", "River", "Ocean", "Road"],
        correct: 0,
        explanation: "This is a mountain."
    },

    {
        world: 5,
        image: "🌊",
        category: "NATURE",
        question: "What is a very large area of salt water called?",
        answers: ["Ocean", "Lake", "Road", "Forest"],
        correct: 0,
        explanation: "A very large area of salt water is an ocean."
    },

    {
        world: 5,
        image: "🌈",
        category: "WEATHER",
        question: "What appears after rain with many colors?",
        answers: ["Rainbow", "Cloud", "Snow", "Wind"],
        correct: 0,
        explanation: "A rainbow can appear after rain."
    },


    /* WORLD 6 */

    {
        world: 6,
        image: "🏥",
        category: "PLACES",
        question: "Where do doctors work?",
        answers: ["Hospital", "School", "Market", "Park"],
        correct: 0,
        explanation: "Doctors work in hospitals."
    },

    {
        world: 6,
        image: "🏦",
        category: "PLACES",
        question: "Where can people keep money?",
        answers: ["Bank", "School", "Park", "Zoo"],
        correct: 0,
        explanation: "People can keep money in a bank."
    },

    {
        world: 6,
        image: "📚",
        category: "PLACES",
        question: "Where can you borrow books?",
        answers: ["Library", "Hospital", "Market", "Airport"],
        correct: 0,
        explanation: "You can borrow books from a library."
    },

    {
        world: 6,
        image: "🛒",
        category: "PLACES",
        question: "Where do people buy food?",
        answers: ["Market", "Hospital", "School", "Airport"],
        correct: 0,
        explanation: "People can buy food at a market."
    },

    {
        world: 6,
        image: "✈️",
        category: "PLACES",
        question: "Where do airplanes arrive and leave?",
        answers: ["Airport", "Library", "Hospital", "School"],
        correct: 0,
        explanation: "Airplanes use an airport."
    },

    {
        world: 6,
        image: "➡️",
        category: "DIRECTIONS",
        question: "What direction is this?",
        answers: ["Right", "Left", "Down", "Back"],
        correct: 0,
        explanation: "The arrow points right."
    },

    {
        world: 6,
        image: "⬅️",
        category: "DIRECTIONS",
        question: "What direction is this?",
        answers: ["Right", "Left", "Up", "Down"],
        correct: 1,
        explanation: "The arrow points left."
    },

    {
        world: 6,
        image: "⬆️",
        category: "DIRECTIONS",
        question: "What direction is this?",
        answers: ["Down", "Left", "Up", "Right"],
        correct: 2,
        explanation: "The arrow points up."
    },

    {
        world: 6,
        image: "⬇️",
        category: "DIRECTIONS",
        question: "What direction is this?",
        answers: ["Down", "Up", "Right", "Left"],
        correct: 0,
        explanation: "The arrow points down."
    },

    {
        world: 6,
        image: "🚦",
        category: "CITY",
        question: "What should you do when the traffic light is red?",
        answers: ["Stop", "Run", "Jump", "Dance"],
        correct: 0,
        explanation: "Red means stop."
    },


    /* WORLD 7 */

    {
        world: 7,
        image: "⏰",
        category: "TIME",
        question: "What tells us the time?",
        answers: ["Clock", "Chair", "Book", "Door"],
        correct: 0,
        explanation: "A clock tells us the time."
    },

    {
        world: 7,
        image: "🌅",
        category: "DAILY LIFE",
        question: "What do you usually do in the morning?",
        answers: ["Wake up", "Go to bed", "Sleep", "Have dinner"],
        correct: 0,
        explanation: "We usually wake up in the morning."
    },

    {
        world: 7,
        image: "🪥",
        category: "DAILY LIFE",
        question: "What do you use to clean your teeth?",
        answers: ["Toothbrush", "Spoon", "Ruler", "Pencil"],
        correct: 0,
        explanation: "We use a toothbrush to clean our teeth."
    },

    {
        world: 7,
        image: "🍳",
        category: "DAILY LIFE",
        question: "What meal do people usually eat in the morning?",
        answers: ["Breakfast", "Dinner", "Supper", "Snack"],
        correct: 0,
        explanation: "Breakfast is the morning meal."
    },

    {
        world: 7,
        image: "🏫",
        category: "DAILY LIFE",
        question: "What do students do at school?",
        answers: ["Study", "Sleep all day", "Cook dinner", "Drive planes"],
        correct: 0,
        explanation: "Students study at school."
    },

    {
        world: 7,
        image: "🌙",
        category: "TIME",
        question: "When do people usually sleep?",
        answers: ["At night", "At noon", "In the morning", "At breakfast"],
        correct: 0,
        explanation: "People usually sleep at night."
    },

    {
        world: 7,
        image: "🕐",
        category: "TIME",
        question: "Which word means 1:00?",
        answers: ["One o'clock", "Two o'clock", "Three o'clock", "Five o'clock"],
        correct: 0,
        explanation: "1:00 is one o'clock."
    },

    {
        world: 7,
        image: "🕒",
        category: "TIME",
        question: "Which word means 3:00?",
        answers: ["One o'clock", "Three o'clock", "Six o'clock", "Ten o'clock"],
        correct: 1,
        explanation: "3:00 is three o'clock."
    },

    {
        world: 7,
        image: "🍽️",
        category: "DAILY LIFE",
        question: "What do you use to eat food?",
        answers: ["Spoon", "Pencil", "Ruler", "Book"],
        correct: 0,
        explanation: "A spoon can be used to eat food."
    },

    {
        world: 7,
        image: "🛌",
        category: "DAILY LIFE",
        question: "What do you do before going to sleep?",
        answers: ["Go to bed", "Go to school", "Eat lunch", "Play football outside"],
        correct: 0,
        explanation: "We go to bed before sleeping."
    },


    /* WORLD 8 */

    {
        world: 8,
        image: "👦",
        category: "GRAMMAR",
        question: "He ___ a student.",
        answers: ["is", "are", "am", "be"],
        correct: 0,
        explanation: "Use 'is' with he."
    },

    {
        world: 8,
        image: "👧",
        category: "GRAMMAR",
        question: "She ___ happy.",
        answers: ["am", "are", "is", "be"],
        correct: 2,
        explanation: "Use 'is' with she."
    },

    {
        world: 8,
        image: "🧑‍🎓",
        category: "GRAMMAR",
        question: "I ___ a student.",
        answers: ["is", "are", "am", "be"],
        correct: 2,
        explanation: "Use 'am' with I."
    },

    {
        world: 8,
        image: "👨‍👩‍👧",
        category: "GRAMMAR",
        question: "They ___ friends.",
        answers: ["is", "am", "are", "be"],
        correct: 2,
        explanation: "Use 'are' with they."
    },

    {
        world: 8,
        image: "🐱",
        category: "GRAMMAR",
        question: "The cat ___ small.",
        answers: ["are", "is", "am", "be"],
        correct: 1,
        explanation: "A singular noun uses 'is'."
    },

    {
        world: 8,
        image: "🐶🐶",
        category: "GRAMMAR",
        question: "The dogs ___ big.",
        answers: ["is", "am", "are", "be"],
        correct: 2,
        explanation: "Plural subjects use 'are'."
    },

    {
        world: 8,
        image: "🏃",
        category: "GRAMMAR",
        question: "I ___ every morning.",
        answers: ["run", "runs", "running", "ran"],
        correct: 0,
        explanation: "Use the base verb with I."
    },

    {
        world: 8,
        image: "👦🏃",
        category: "GRAMMAR",
        question: "He ___ every morning.",
        answers: ["run", "runs", "running", "ran"],
        correct: 1,
        explanation: "With he, the verb usually takes -s in simple present."
    },

    {
        world: 8,
        image: "👧📖",
        category: "GRAMMAR",
        question: "She ___ a book every day.",
        answers: ["read", "reads", "reading", "to read"],
        correct: 1,
        explanation: "Use 'reads' with she."
    },

    {
        world: 8,
        image: "👨⚽",
        category: "GRAMMAR",
        question: "He ___ football on Sunday.",
        answers: ["play", "plays", "playing", "played"],
        correct: 1,
        explanation: "Use 'plays' with he."
    },


    /* WORLD 9 */

    {
        world: 9,
        image: "📚",
        category: "SENTENCE",
        question: "Choose the correct sentence.",
        answers: [
            "I am a student.",
            "I is a student.",
            "I are a student.",
            "I be student."
        ],
        correct: 0,
        explanation: "The correct sentence is 'I am a student.'"
    },

    {
        world: 9,
        image: "🐱",
        category: "SENTENCE",
        question: "Choose the correct sentence.",
        answers: [
            "The cat is small.",
            "The cat are small.",
            "The cat am small.",
            "The cat be small."
        ],
        correct: 0,
        explanation: "Use 'is' with a singular subject."
    },

    {
        world: 9,
        image: "🐶",
        category: "SENTENCE",
        question: "Choose the correct sentence.",
        answers: [
            "The dog likes milk.",
            "The dog like milk.",
            "The dog liking milk.",
            "The dog are like milk."
        ],
        correct: 0,
        explanation: "With 'the dog', use 'likes'."
    },

    {
        world: 9,
        image: "👨‍👩‍👧",
        category: "SENTENCE",
        question: "Choose the correct sentence.",
        answers: [
            "They are happy.",
            "They is happy.",
            "They am happy.",
            "They be happy."
        ],
        correct: 0,
        explanation: "Use 'are' with they."
    },

    {
        world: 9,
        image: "🏫",
        category: "SENTENCE",
        question: "Choose the correct sentence.",
        answers: [
            "I go to school.",
            "I goes to school.",
            "I going school.",
            "I is go school."
        ],
        correct: 0,
        explanation: "Use the base verb 'go' with I."
    },

    {
        world: 9,
        image: "🍎",
        category: "SENTENCE",
        question: "Choose the correct sentence.",
        answers: [
            "She eats an apple.",
            "She eat an apple.",
            "She eating apple.",
            "She are eats apple."
        ],
        correct: 0,
        explanation: "Use 'eats' with she."
    },

    {
        world: 9,
        image: "⚽",
        category: "SENTENCE",
        question: "Choose the correct sentence.",
        answers: [
            "We play football.",
            "We plays football.",
            "We playing football.",
            "We is play football."
        ],
        correct: 0,
        explanation: "Use 'play' with we."
    },

    {
        world: 9,
        image: "🏠",
        category: "SENTENCE",
        question: "Choose the correct sentence.",
        answers: [
            "My house is big.",
            "My house are big.",
            "My house am big.",
            "My house be big."
        ],
        correct: 0,
        explanation: "A singular subject uses 'is'."
    },

    {
        world: 9,
        image: "🌞",
        category: "SENTENCE",
        question: "Choose the correct sentence.",
        answers: [
            "The sun is hot.",
            "The sun are hot.",
            "The sun am hot.",
            "The sun be hot."
        ],
        correct: 0,
        explanation: "Use 'is' with the singular subject 'the sun'."
    },

    {
        world: 9,
        image: "🐦",
        category: "SENTENCE",
        question: "Choose the correct sentence.",
        answers: [
            "The bird can fly.",
            "The bird can flies.",
            "The bird can flying.",
            "The bird can is fly."
        ],
        correct: 0,
        explanation: "After 'can', use the base verb."
    },


    /* WORLD 10 */

    {
        world: 10,
        image: "🧠",
        category: "FINAL CHALLENGE",
        question: "What is the opposite of 'big'?",
        answers: ["Small", "Tall", "Long", "Fast"],
        correct: 0,
        explanation: "The opposite of big is small."
    },

    {
        world: 10,
        image: "🌞",
        category: "FINAL CHALLENGE",
        question: "What is the opposite of 'hot'?",
        answers: ["Cold", "Warm", "Big", "Fast"],
        correct: 0,
        explanation: "The opposite of hot is cold."
    },

    {
        world: 10,
        image: "⬆️",
        category: "FINAL CHALLENGE",
        question: "What is the opposite of 'up'?",
        answers: ["Down", "Right", "Left", "High"],
        correct: 0,
        explanation: "The opposite of up is down."
    },

    {
        world: 10,
        image: "🌞🌙",
        category: "FINAL CHALLENGE",
        question: "What comes after day?",
        answers: ["Night", "Morning", "Lunch", "School"],
        correct: 0,
        explanation: "Night comes after day."
    },

    {
        world: 10,
        image: "1️⃣2️⃣3️⃣",
        category: "FINAL CHALLENGE",
        question: "What number comes after nine?",
        answers: ["Eight", "Ten", "Seven", "Eleven"],
        correct: 1,
        explanation: "Ten comes after nine."
    },

    {
        world: 10,
        image: "🐘",
        category: "FINAL CHALLENGE",
        question: "Which animal is usually very large?",
        answers: ["Elephant", "Ant", "Mouse", "Butterfly"],
        correct: 0,
        explanation: "An elephant is a very large land animal."
    },

    {
        world: 10,
        image: "🧊",
        category: "FINAL CHALLENGE",
        question: "Ice is usually...",
        answers: ["Cold", "Hot", "Loud", "Fast"],
        correct: 0,
        explanation: "Ice is cold."
    },

    {
        world: 10,
        image: "🌳",
        category: "FINAL CHALLENGE",
        question: "Which one is a plant?",
        answers: ["Tree", "Dog", "Fish", "Car"],
        correct: 0,
        explanation: "A tree is a plant."
    },

    {
        world: 10,
        image: "🚗",
        category: "FINAL CHALLENGE",
        question: "Which one is used for transportation?",
        answers: ["Car", "Apple", "Book", "Chair"],
        correct: 0,
        explanation: "A car is a means of transportation."
    },

    {
        world: 10,
        image: "🏆",
        category: "FINAL CHALLENGE",
        question: "What should you do when learning English?",
        answers: [
            "Practice regularly",
            "Never practice",
            "Give up",
            "Ignore new words"
        ],
        correct: 0,
        explanation: "Regular practice helps you improve your English."
    }

];


/* =========================================================
   SHUFFLE
========================================================= */

function shuffleArray(array) {

    for (
        let i = array.length - 1;
        i > 0;
        i--
    ) {

        const randomIndex =
            Math.floor(
                Math.random() * (i + 1)
            );

        [
            array[i],
            array[randomIndex]
        ] = [
            array[randomIndex],
            array[i]
        ];

    }

    return array;
}


/* =========================================================
   DOM HELPER
========================================================= */

function $(id) {
    return document.getElementById(id);
}


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadGame();

        setupButtons();

        updateUI();

        updateWorldMap();

        showLoading();

    }
);


/* =========================================================
   LOADING
========================================================= */

function showLoading() {

    const loadingScreen =
        $("loadingScreen");

    if (!loadingScreen) return;

    let progress = 0;

    const interval =
        setInterval(
            () => {

                progress += 10;

                if ($("loadingProgress")) {

                    $("loadingProgress").style.width =
                        progress + "%";

                }

                if ($("loadingText")) {

                    if (progress < 40) {

                        $("loadingText").textContent =
                            "Preparing your adventure...";

                    }

                    else if (progress < 70) {

                        $("loadingText").textContent =
                            "Loading Wordland...";

                    }

                    else {

                        $("loadingText").textContent =
                            "Ready!";

                    }

                }

                if (progress >= 100) {

                    clearInterval(interval);

                    setTimeout(
                        () => {

                            loadingScreen.style.display =
                                "none";

                        },
                        400
                    );

                }

            },
            80
        );

}


/* =========================================================
   BUTTON SETUP
========================================================= */

function setupButtons() {

    /* START ADVENTURE */

    const startButton =
        $("startAdventureBtn");

    if (startButton) {

        startButton.addEventListener(
            "click",
            () => {

                playSound("click");

                startWorld(
                    player.unlockedWorld
                );

            }
        );

    }


    /* WORLD BUTTONS */

    document
        .querySelectorAll(".world-button")
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const world =
                            Number(
                                button.dataset.world
                            );

                        if (
                            world <=
                            player.unlockedWorld
                        ) {

                            playSound("click");

                            startWorld(world);

                        }

                    }
                );

            }
        );


    /* BACK */

    const backButton =
        $("lessonBackBtn");

    if (backButton) {

        backButton.addEventListener(
            "click",
            () => {

                playSound("click");

                showHome();

            }
        );

    }


    /* ANSWERS */

    document
        .querySelectorAll(".answer-button")
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        if (questionAnswered) {
                            return;
                        }

                        const answer =
                            Number(
                                button.dataset.answer
                            );

                        answerQuestion(
                            answer,
                            button
                        );

                    }
                );

            }
        );


    /* HINT */

    const hintButton =
        $("hintButton");

    if (hintButton) {

        hintButton.addEventListener(
            "click",
            () => {

                playSound("click");

                showHint();

            }
        );

    }


    /* RETRY */

    const retryButton =
        $("retryButton");

    if (retryButton) {

        retryButton.addEventListener(
            "click",
            () => {

                playSound("click");

                startWorld(currentWorld);

            }
        );

    }


    /* CONTINUE */

    const continueButton =
        $("continueButton");

    if (continueButton) {

        continueButton.addEventListener(
            "click",
            () => {

                playSound("click");

                showHome();

            }
        );

    }


    /* PROFILE */

    const profileButton =
        $("profileButton");

    if (profileButton) {

        profileButton.addEventListener(
            "click",
            () => {

                playSound("click");

                openPanel(
                    "profilePanel"
                );

            }
        );

    }


    const closeProfile =
        $("closeProfileBtn");

    if (closeProfile) {

        closeProfile.addEventListener(
            "click",
            () => {

                playSound("click");

                closePanels();

            }
        );

    }


    /* ACHIEVEMENTS */

    const achievementButton =
        $("achievementButton");

    if (achievementButton) {

        achievementButton.addEventListener(
            "click",
            () => {

                playSound("click");

                openPanel(
                    "achievementPanel"
                );

            }
        );

    }


    const closeAchievement =
        $("closeAchievementBtn");

    if (closeAchievement) {

        closeAchievement.addEventListener(
            "click",
            () => {

                playSound("click");

                closePanels();

            }
        );

    }


    /* SETTINGS */

    const settingsButton =
        $("settingsButton");

    if (settingsButton) {

        settingsButton.addEventListener(
            "click",
            () => {

                playSound("click");

                openPanel(
                    "settingsPanel"
                );

            }
        );

    }


    const closeSettings =
        $("closeSettingsBtn");

    if (closeSettings) {

        closeSettings.addEventListener(
            "click",
            () => {

                playSound("click");

                closePanels();

            }
        );

    }


    /* SOUND */

    const soundToggle =
        $("soundToggle");

    if (soundToggle) {

        soundToggle.addEventListener(
            "click",
            toggleSound
        );

    }


    /* MUSIC */

    const musicToggle =
        $("musicToggle");

    if (musicToggle) {

        musicToggle.addEventListener(
            "click",
            toggleMusic
        );

    }


    /* RESET */

    const resetButton =
        $("resetProgressButton");

    if (resetButton) {

        resetButton.addEventListener(
            "click",
            resetGame
        );

    }


    /* DAILY REWARD */

    const dailyButton =
        $("dailyRewardBtn");

    if (dailyButton) {

        dailyButton.addEventListener(
            "click",
            () => {

                playSound("click");

                claimDailyReward();

            }
        );

    }

}


/* =========================================================
   START WORLD
========================================================= */

function startWorld(worldNumber) {

    if (
        worldNumber >
        player.unlockedWorld
    ) {

        showNotification(
            "🔒",
            "This world is still locked!"
        );

        return;

    }


    currentWorld =
        worldNumber;

    currentQuestionIndex =
        0;

    currentScore =
        0;

    currentCorrect =
        0;

    currentWrong =
        0;

    currentStreak =
        0;

    questionAnswered =
        false;


    /* GET QUESTIONS FOR THIS WORLD */

    currentQuestions =
        questions.filter(
            question =>
                question.world ===
                worldNumber
        );


    /* =====================================================
       RANDOMIZE QUESTION ORDER

       IMPORTANT:
       slice() creates a new array so the original
       questions array is never modified.
    ====================================================== */

    currentQuestions =
        [...currentQuestions];

    shuffleArray(
        currentQuestions
    );


    const world =
        worlds[worldNumber];


    /* HEADER */

    if ($("stageIcon")) {

        $("stageIcon").textContent =
            world.icon;

    }


    if ($("stageWorld")) {

        $("stageWorld").textContent =
            worldNumber === 10
                ? "FINAL WORLD"
                : "WORLD " +
                  String(worldNumber)
                    .padStart(2, "0");

    }


    if ($("stageTitle")) {

        $("stageTitle").textContent =
            world.title;

    }


    if ($("stageDescription")) {

        $("stageDescription").textContent =
            world.description;

    }


    showScreen(
        "lessonScreen"
    );


    loadQuestion();

}


/* =========================================================
   LOAD QUESTION
========================================================= */

function loadQuestion() {

    questionAnswered =
        false;


    const question =
        currentQuestions[
            currentQuestionIndex
        ];


    if (!question) {

        finishWorld();

        return;

    }


    /* QUESTION NUMBER */

    if ($("questionNumber")) {

        $("questionNumber").textContent =
            currentQuestionIndex + 1;

    }


    if ($("totalQuestions")) {

        $("totalQuestions").textContent =
            currentQuestions.length;

    }


    /* PROGRESS */

    const progress =
        (
            currentQuestionIndex /
            currentQuestions.length
        ) * 100;


    if ($("questionProgress")) {

        $("questionProgress").style.width =
            progress + "%";

    }


    /* IMAGE */

    if ($("questionImage")) {

        $("questionImage").textContent =
            question.image;

    }


    /* CATEGORY */

    if ($("questionCategory")) {

        $("questionCategory").textContent =
            question.category;

    }


    /* QUESTION */

    if ($("questionText")) {

        $("questionText").textContent =
            question.question;

    }


    /* =====================================================
       RANDOMIZE ANSWERS
    ====================================================== */

    shuffledAnswers =
        question.answers.map(
            (
                answer,
                originalIndex
            ) => {

                return {
                    text: answer,
                    originalIndex:
                        originalIndex
                };

            }
        );


    shuffleArray(
        shuffledAnswers
    );


    /* =====================================================
       FIND NEW POSITION OF CORRECT ANSWER
    ====================================================== */

    currentCorrectAnswerIndex =
        shuffledAnswers.findIndex(
            answer =>
                answer.originalIndex ===
                question.correct
        );


    /* =====================================================
       DISPLAY ANSWERS
    ====================================================== */

    const buttons =
        document.querySelectorAll(
            ".answer-button"
        );


    buttons.forEach(
        (
            button,
            index
        ) => {

            if (!shuffledAnswers[index]) {
                button.textContent = "";
                button.disabled = true;
                return;
            }


            button.textContent =
                shuffledAnswers[index].text;


            /*
               IMPORTANT:

               data-answer is now the POSITION
               of the shuffled answer.

               Example:

               original correct = 0

               after shuffle:
               position 0 = wrong
               position 1 = wrong
               position 2 = correct
               position 3 = wrong

               data-answer of correct button
               becomes 2.
            */

            button.dataset.answer =
                index;


            button.disabled =
                false;


            button.classList.remove(
                "correct"
            );


            button.classList.remove(
                "wrong"
            );

        }
    );


    /* FEEDBACK */

    if ($("answerFeedback")) {

        $("answerFeedback").textContent =
            "";

        $("answerFeedback").className =
            "answer-feedback";

    }


    updateStreakUI();

}


/* =========================================================
   ANSWER QUESTION
========================================================= */

function answerQuestion(
    selectedAnswer,
    clickedButton
) {

    if (questionAnswered) {
        return;
    }


    questionAnswered =
        true;


    const question =
        currentQuestions[
            currentQuestionIndex
        ];


    const buttons =
        document.querySelectorAll(
            ".answer-button"
        );


    buttons.forEach(
        button => {

            button.disabled =
                true;

        }
    );


    /*
       IMPORTANT:

       We DO NOT use:

       question.correct

       here anymore.

       Because the answers have been shuffled.

       We use currentCorrectAnswerIndex.
    */

    const correctAnswer =
        currentCorrectAnswerIndex;


    /* =====================================================
       CORRECT
    ====================================================== */

    if (
        selectedAnswer ===
        correctAnswer
    ) {

        clickedButton.classList.add(
            "correct"
        );


        currentCorrect++;

        currentStreak++;

        player.totalCorrect++;

        player.totalQuestions++;

        currentScore += 10;


        /* STREAK BONUS */

        if (
            currentStreak >= 3
        ) {

            currentScore += 5;

        }


        if (
            currentStreak >
            player.bestStreak
        ) {

            player.bestStreak =
                currentStreak;

        }


        /* CORRECT SOUND */

        playSound(
            "correct"
        );


        showFeedback(
            "✅ Correct! +" +
            (
                currentStreak >= 3
                    ? "15"
                    : "10"
            ) +
            " points"
        );


        /* SMALL HP REWARD */

        player.hp =
            Math.min(
                100,
                player.hp + 2
            );


        /* COINS */

        player.coins += 2;


        updateUI();

    }


    /* =====================================================
       WRONG
    ====================================================== */

    else {

        clickedButton.classList.add(
            "wrong"
        );


        /*
           Highlight the REAL correct answer.
        */

        if (
            buttons[
                correctAnswer
            ]
        ) {

            buttons[
                correctAnswer
            ].classList.add(
                "correct"
            );

        }


        currentWrong++;

        currentStreak =
            0;

        player.totalQuestions++;


        /* WRONG PENALTY */

        player.hp =
            Math.max(
                0,
                player.hp - 5
            );


        /* WRONG SOUND */

        playSound(
            "wrong"
        );


        showFeedback(
            "❌ Not quite! " +
            question.explanation
        );


        updateUI();

    }


    updateStreakUI();


    /* =====================================================
       AUTO NEXT
    ====================================================== */

    setTimeout(
        () => {

            currentQuestionIndex++;


            if (
                currentQuestionIndex >=
                currentQuestions.length
            ) {

                finishWorld();

            }

            else {

                loadQuestion();

            }

        },
        1200
    );

}


/* =========================================================
   FEEDBACK
========================================================= */

function showFeedback(
    message
) {

    const feedback =
        $("answerFeedback");


    if (!feedback) {
        return;
    }


    feedback.textContent =
        message;


    feedback.classList.add(
        "show"
    );

}


/* =========================================================
   HINT
========================================================= */

function showHint() {

    if (questionAnswered) {
        return;
    }


    const question =
        currentQuestions[
            currentQuestionIndex
        ];


    if (!question) {
        return;
    }


    /*
       Use the shuffled answer list so the hint
       always refers to the current question.
    */

    let correct = "";


    if (
        shuffledAnswers.length ===
        question.answers.length &&
        shuffledAnswers[
            currentCorrectAnswerIndex
        ]
    ) {

        correct =
            shuffledAnswers[
                currentCorrectAnswerIndex
            ].text;

    }

    else {

        correct =
            question.answers[
                question.correct
            ];

    }


    showNotification(
        "💡",
        "Hint: The answer starts with \"" +
        correct.charAt(0) +
        "...\""
    );


    /* SMALL COIN COST */

    if (
        player.coins >= 1
    ) {

        player.coins--;

        updateUI();

        saveGame();

    }

}


/* =========================================================
   FINISH WORLD
========================================================= */

function finishWorld() {

    questionAnswered =
        true;


    const total =
        currentQuestions.length;


    const percentage =
        total > 0
            ? Math.round(
                (
                    currentCorrect /
                    total
                ) * 100
            )
            : 0;


    let stars =
        0;


    if (
        percentage >= 90
    ) {

        stars =
            3;

    }

    else if (
        percentage >= 70
    ) {

        stars =
            2;

    }

    else if (
        percentage >= 50
    ) {

        stars =
            1;

    }


    /* KEEP BEST STAR */

    if (
        stars >
        player.worldStars[
            currentWorld
        ]
    ) {

        player.worldStars[
            currentWorld
        ] =
            stars;

    }


    /* =====================================================
       EXP
    ====================================================== */

    const earnedEXP =
        currentScore +
        currentCorrect * 5;


    addEXP(
        earnedEXP
    );


    /* =====================================================
       COINS
    ====================================================== */

    const rewardCoins =
        10 +
        stars * 5;


    player.coins +=
        rewardCoins;


    /* =====================================================
       UNLOCK NEXT WORLD
    ====================================================== */

    if (
        stars >= 2 &&
        currentWorld < 10
    ) {

        const nextWorld =
            currentWorld + 1;


        if (
            nextWorld >
            player.unlockedWorld
        ) {

            player.unlockedWorld =
                nextWorld;


            showNotification(
                "🔓",
                "New World Unlocked!"
            );

        }

    }


    /* ACHIEVEMENTS */

    checkAchievements();


    saveGame();


    /* =====================================================
       RESULT
    ====================================================== */

    if ($("finalScore")) {

        $("finalScore").textContent =
            currentScore;

    }


    if ($("finalStars")) {

        $("finalStars").textContent =
            getStars(
                stars
            );

    }


    if ($("correctAnswers")) {

        $("correctAnswers").textContent =
            currentCorrect;

    }


    if ($("wrongAnswers")) {

        $("wrongAnswers").textContent =
            currentWrong;

    }


    if ($("earnedEXP")) {

        $("earnedEXP").textContent =
            "+" +
            earnedEXP;

    }


    if ($("resultReward")) {

        $("resultReward").textContent =
            "+" +
            rewardCoins +
            " 🪙";

    }


    /* RESULT TITLE */

    if ($("resultTitle")) {

        if (
            percentage === 100
        ) {

            $("resultTitle").textContent =
                "Perfect! 🏆";

        }

        else if (
            percentage >= 90
        ) {

            $("resultTitle").textContent =
                "Amazing! 🎉";

        }

        else if (
            percentage >= 70
        ) {

            $("resultTitle").textContent =
                "Great Job! ⭐";

        }

        else if (
            percentage >= 50
        ) {

            $("resultTitle").textContent =
                "Good Try! 💪";

        }

        else {

            $("resultTitle").textContent =
                "Keep Learning! 📚";

        }

    }


    if ($("resultMessage")) {

        $("resultMessage").textContent =
            currentCorrect +
            " out of " +
            total +
            " answers correct!";

    }


    if ($("resultIcon")) {

        if (
            currentWorld === 10 &&
            percentage >= 70
        ) {

            $("resultIcon").textContent =
                "🐉🏆";

        }

        else if (
            percentage >= 90
        ) {

            $("resultIcon").textContent =
                "🏆";

        }

        else {

            $("resultIcon").textContent =
                "🎉";

        }

    }


    /* FINISH SOUND */

    playSound(
        "finish"
    );


    showScreen(
        "resultScreen"
    );


    updateWorldMap();

    updateUI();

}


/* =========================================================
   STARS
========================================================= */

function getStars(
    number
) {

    if (
        number === 3
    ) {

        return "⭐⭐⭐";

    }


    if (
        number === 2
    ) {

        return "⭐⭐☆";

    }


    if (
        number === 1
    ) {

        return "⭐☆☆";

    }


    return "☆☆☆";

}


/* =========================================================
   ADD EXP
========================================================= */

function addEXP(
    amount
) {

    player.exp +=
        amount;


    let required =
        getRequiredEXP();


    while (
        player.exp >=
        required
    ) {

        player.exp -=
            required;


        player.level++;


        player.hp =
            100;


        /* LEVEL UP SOUND */

        playSound(
            "levelUp"
        );


        showNotification(
            "⬆️",
            "LEVEL UP! You are now Level " +
            player.level
        );


        required =
            getRequiredEXP();

    }


    saveGame();

    updateUI();

}


/* =========================================================
   REQUIRED EXP
========================================================= */

function getRequiredEXP() {

    return (
        100 +
        (
            player.level - 1
        ) * 50
    );

}


/* =========================================================
   UPDATE UI
========================================================= */

function updateUI() {

    if ($("playerName")) {

        $("playerName").textContent =
            player.name;

    }


    if ($("playerLevel")) {

        $("playerLevel").textContent =
            player.level;

    }


    if ($("playerHP")) {

        $("playerHP").textContent =
            player.hp;

    }


    if ($("playerEXP")) {

        $("playerEXP").textContent =
            player.exp;

    }


    if ($("playerCoins")) {

        $("playerCoins").textContent =
            player.coins;

    }


    const required =
        getRequiredEXP();


    if ($("currentEXP")) {

        $("currentEXP").textContent =
            player.exp;

    }


    if ($("requiredEXP")) {

        $("requiredEXP").textContent =
            required;

    }


    if ($("expProgress")) {

        const percentage =
            Math.min(
                100,
                (
                    player.exp /
                    required
                ) * 100
            );


        $("expProgress").style.width =
            percentage + "%";

    }


    /* PROFILE */

    if ($("profileName")) {

        $("profileName").textContent =
            player.name;

    }


    if ($("profileLevel")) {

        $("profileLevel").textContent =
            player.level;

    }


    if ($("profileEXP")) {

        $("profileEXP").textContent =
            player.exp;

    }


    if ($("profileCoins")) {

        $("profileCoins").textContent =
            player.coins;

    }


    if ($("achievementCount")) {

        $("achievementCount").textContent =
            player.achievements.length;

    }


    updateSoundButtons();

}


/* =========================================================
   STREAK UI
========================================================= */

function updateStreakUI() {

    if ($("streak")) {

        $("streak").textContent =
            currentStreak;

    }

}


/* =========================================================
   WORLD MAP
========================================================= */

function updateWorldMap() {

    document
        .querySelectorAll(
            ".world-card"
        )
        .forEach(
            card => {

                const world =
                    Number(
                        card.dataset.world
                    );


                const button =
                    card.querySelector(
                        ".world-button"
                    );


                const starsElement =
                    card.querySelector(
                        ".world-stars"
                    );


                if (
                    world <=
                    player.unlockedWorld
                ) {

                    card.classList.remove(
                        "locked"
                    );


                    card.classList.add(
                        "unlocked"
                    );


                    if (button) {

                        button.disabled =
                            false;

                        button.textContent =
                            "PLAY";

                    }


                    if (starsElement) {

                        starsElement.textContent =
                            getStars(
                                player.worldStars[
                                    world
                                ]
                            );

                    }

                }


                else {

                    card.classList.remove(
                        "unlocked"
                    );


                    card.classList.add(
                        "locked"
                    );


                    if (button) {

                        button.disabled =
                            true;

                        button.textContent =
                            "🔒";

                    }


                    if (starsElement) {

                        starsElement.textContent =
                            "🔒";

                    }

                }

            }
        );

}


/* =========================================================
   SCREEN CONTROL
========================================================= */

function showScreen(
    screenId
) {

    const screens = [
        "homeScreen",
        "lessonScreen",
        "resultScreen"
    ];


    screens.forEach(
        id => {

            const element =
                $(id);


            if (!element) {
                return;
            }


            if (
                id === screenId
            ) {

                element.classList.remove(
                    "hidden"
                );


                element.style.display =
                    "";

            }


            else {

                element.classList.add(
                    "hidden"
                );


                element.style.display =
                    "none";

            }

        }
    );

}


function showHome() {

    closePanels();


    showScreen(
        "homeScreen"
    );


    updateWorldMap();

    updateUI();

}


/* =========================================================
   PANELS
========================================================= */

function openPanel(
    panelId
) {

    closePanels();


    const panel =
        $(panelId);


    if (!panel) {
        return;
    }


    panel.classList.remove(
        "hidden"
    );

}


function closePanels() {

    document
        .querySelectorAll(
            ".side-panel"
        )
        .forEach(
            panel => {

                panel.classList.add(
                    "hidden"
                );

            }
        );

}


/* =========================================================
   NOTIFICATION
========================================================= */

let notificationTimer =
    null;


function showNotification(
    icon,
    message
) {

    const notification =
        $("notification");


    const notificationIcon =
        $("notificationIcon");


    const notificationText =
        $("notificationText");


    if (
        !notification ||
        !notificationIcon ||
        !notificationText
    ) {

        return;

    }


    notificationIcon.textContent =
        icon;


    notificationText.textContent =
        message;


    notification.classList.add(
        "show"
    );


    clearTimeout(
        notificationTimer
    );


    notificationTimer =
        setTimeout(
            () => {

                notification.classList.remove(
                    "show"
                );

            },
            2500
        );

}


/* =========================================================
   ACHIEVEMENTS
========================================================= */

const achievementData = {

    firstStep: {
        name: "First Step",
        icon: "🌟"
    },

    hotStreak: {
        name: "Hot Streak",
        icon: "🔥"
    },

    wordMaster: {
        name: "Word Master",
        icon: "🧠"
    },

    perfectHero: {
        name: "Perfect Hero",
        icon: "🏆"
    },

    explorer: {
        name: "Explorer",
        icon: "🗺️"
    },

    englishMaster: {
        name: "English Master",
        icon: "👑"
    }

};


function checkAchievements() {

    /* FIRST STEP */

    if (
        player.totalCorrect >= 1
    ) {

        unlockAchievement(
            "firstStep"
        );

    }


    /* HOT STREAK */

    if (
        player.bestStreak >= 5
    ) {

        unlockAchievement(
            "hotStreak"
        );

    }


    /* WORD MASTER */

    if (
        player.totalCorrect >= 50
    ) {

        unlockAchievement(
            "wordMaster"
        );

    }


    /* PERFECT HERO */

    if (
        player.worldStars[
            currentWorld
        ] === 3
    ) {

        unlockAchievement(
            "perfectHero"
        );

    }


    /* EXPLORER */

    let completedWorlds =
        0;


    for (
        let i = 1;
        i <= 10;
        i++
    ) {

        if (
            player.worldStars[i] > 0
        ) {

            completedWorlds++;

        }

    }


    if (
        completedWorlds >= 5
    ) {

        unlockAchievement(
            "explorer"
        );

    }


    /* ENGLISH MASTER */

    if (
        player.worldStars[10] >= 2
    ) {

        unlockAchievement(
            "englishMaster"
        );

    }


    updateAchievementUI();

}


function unlockAchievement(
    id
) {

    if (
        player.achievements.includes(
            id
        )
    ) {

        return;

    }


    player.achievements.push(
        id
    );


    const achievement =
        achievementData[id];


    showNotification(
        achievement.icon,
        "Achievement Unlocked: " +
        achievement.name
    );


    updateAchievementUI();

    saveGame();

}


function updateAchievementUI() {

    const list =
        $("achievementList");


    if (!list) {
        return;
    }


    const achievements =
        list.querySelectorAll(
            ".achievement"
        );


    const ids = [
        "firstStep",
        "hotStreak",
        "wordMaster",
        "perfectHero"
    ];


    achievements.forEach(
        (
            element,
            index
        ) => {

            const id =
                ids[index];


            if (
                player.achievements.includes(
                    id
                )
            ) {

                element.classList.remove(
                    "locked"
                );


                element.classList.add(
                    "unlocked"
                );

            }

        }
    );

}


/* =========================================================
   DAILY REWARD
========================================================= */

function claimDailyReward() {

    const today =
        new Date()
            .toISOString()
            .split("T")[0];


    if (
        player.lastRewardDate ===
        today
    ) {

        showNotification(
            "⏰",
            "You already claimed today's reward!"
        );

        return;

    }


    player.lastRewardDate =
        today;


    const rewardCoins =
        20;


    player.coins +=
        rewardCoins;


    addEXP(
        10
    );


    saveGame();

    updateUI();


    const button =
        $("dailyRewardBtn");


    if (button) {

        button.textContent =
            "CLAIMED";


        button.disabled =
            true;

    }


    showNotification(
        "🎁",
        "+20 Coins and +10 EXP!"
    );

}


/* =========================================================
   SOUND SYSTEM
========================================================= */

function playSound(
    type
) {

    if (!player.sound) {
        return;
    }


    const audioMap = {

        correct:
            "correctSound",

        wrong:
            "wrongSound",

        click:
            "clickSound",

        levelUp:
            "levelUpSound",

        finish:
            "finishSound"

    };


    const audioId =
        audioMap[type];


    if (!audioId) {
        return;
    }


    const audio =
        $(audioId);


    if (!audio) {

        console.warn(
            "Sound element not found:",
            audioId
        );

        return;

    }


    try {

        /*
           Stop previous sound first.
           This makes rapid button presses sound clean.
        */

        audio.pause();

        audio.currentTime =
            0;


        const promise =
            audio.play();


        /*
           Prevent browser console errors
           caused by autoplay restrictions.
        */

        if (
            promise &&
            typeof promise.catch ===
            "function"
        ) {

            promise.catch(
                () => {}
            );

        }

    }

    catch (error) {

        console.warn(
            "Unable to play sound:",
            type,
            error
        );

    }

}


/* =========================================================
   SOUND TOGGLE
========================================================= */

function toggleSound() {

    player.sound =
        !player.sound;


    updateSoundButtons();

    saveGame();


    if (
        player.sound
    ) {

        playSound(
            "click"
        );

    }

}


function toggleMusic() {

    player.music =
        !player.music;


    updateSoundButtons();

    saveGame();

}


function updateSoundButtons() {

    const sound =
        $("soundToggle");


    const music =
        $("musicToggle");


    if (sound) {

        sound.textContent =
            player.sound
                ? "ON"
                : "OFF";


        sound.classList.toggle(
            "active",
            player.sound
        );

    }


    if (music) {

        music.textContent =
            player.music
                ? "ON"
                : "OFF";


        music.classList.toggle(
            "active",
            player.music
        );

    }

}


/* =========================================================
   SAVE GAME
========================================================= */

function saveGame() {

    try {

        localStorage.setItem(
            GAME_KEY,
            JSON.stringify(
                player
            )
        );

    }

    catch (error) {

        console.warn(
            "Unable to save game.",
            error
        );

    }

}


/* =========================================================
   LOAD GAME
========================================================= */

function loadGame() {

    try {

        const saved =
            localStorage.getItem(
                GAME_KEY
            );


        if (!saved) {

            saveGame();

            return;

        }


        const data =
            JSON.parse(
                saved
            );


        player = {

            ...player,

            ...data

        };


        /* SAFETY */

        if (
            !player.worldStars
        ) {

            player.worldStars =
                {};

        }


        for (
            let i = 1;
            i <= 10;
            i++
        ) {

            if (
                typeof player.worldStars[i]
                !== "number"
            ) {

                player.worldStars[i] =
                    0;

            }

        }


        if (
            !Array.isArray(
                player.achievements
            )
        ) {

            player.achievements =
                [];

        }

    }

    catch (error) {

        console.warn(
            "Save data could not be loaded.",
            error
        );

    }

}


/* =========================================================
   RESET GAME
========================================================= */

function resetGame() {

    const confirmReset =
        confirm(
            "Reset all English Adventure progress?"
        );


    if (!confirmReset) {
        return;
    }


    localStorage.removeItem(
        GAME_KEY
    );


    location.reload();

}


/* =========================================================
   PREVENT ACCIDENTAL DOUBLE CLICK
========================================================= */

document.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                "button"
            );


        if (!button) {
            return;
        }


        if (
            button.classList.contains(
                "answer-button"
            )
        ) {

            if (
                questionAnswered
            ) {

                event.preventDefault();

            }

        }

    }
);


/* =========================================================
   KEYBOARD SUPPORT
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            !currentQuestions.length
        ) {

            return;

        }


        if (
            questionAnswered
        ) {

            return;

        }


        const key =
            event.key;


        if (
            ["1", "2", "3", "4"]
                .includes(key)
        ) {

            const answer =
                Number(key) - 1;


            const button =
                document.querySelector(
                    `.answer-button[data-answer="${answer}"]`
                );


            if (button) {

                playSound(
                    "click"
                );


                answerQuestion(
                    answer,
                    button
                );

            }

        }

    }
);


/* =========================================================
   INITIAL ACHIEVEMENT CHECK
========================================================= */

setTimeout(
    () => {

        checkAchievements();

        updateAchievementUI();

        updateWorldMap();

        updateUI();

    },
    500
);


/* =========================================================
   END OF SCRIPT
========================================================= */