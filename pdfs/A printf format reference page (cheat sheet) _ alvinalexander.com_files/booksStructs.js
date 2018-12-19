// shuffle the given array (in place)
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// like "/java/foo/bar"
function getUri() {
    return location.pathname;
}

function firstNChars(s, n) {
    return s.substring(0, n);
}

function Book(title, href, imageUri, description) {
    this.title = title;
    this.href = href;
    this.imageUri = imageUri;
    this.description = description;    
}

function htmlFromBook(book) {
    var html = '<div class="lhs-book" align="center"><a '
             + 'href="' + book.href + '" rel="nofollow"><img '
             + 'alt="' + book.title + '"'
             + 'title="' + book.title + '"'
             + 'src="' + book.imageUri + '"'
             + 'width="145" />'
             + '<br />' + book.description + '</a></div>';
    return html;    
}

// MOST POPULAR (THAT ARE NOT MINE)
var popularBooks = [
    new Book(
        "Grokking Algorithms: An illustrated guide" ,
        "http://kbhr.co/grokking",
        "/images/books/grokking-algorithms-illustrated-guide-2.jpg",
        "Grokking Algorithms" 
    ),
    new Book(
        "Scala for the Impatient (2nd Edition)" ,
        "http://kbhr.co/scala-imp",
        "/images/books/scala-for-impatient.jpg",
        "2nd Edition" 
    ),
    new Book(
        "A Smarter Way to Learn JavaScript",
        "http://kbhr.co/sm-javascript",
        "/images/books/smarter-way-learn-javascript-3.jpg" ,
        "A Smarter Way to Learn JavaScript"
    ),
    new Book(
        "Programming in Scala: Updated for Scala 2.12",
        "http://kbhr.co/pgmg-in-scala",
        "/images/books/programming-in-scala.jpg",
        "Programming in Scala<br />Updated for Scala 2.12"
    ),
];


// SCALA
var scalaBooks = [
    new Book(
        "Scala for the Impatient (2nd Edition)" ,
        "http://kbhr.co/scala-imp",
        "/images/books/scala-for-impatient.jpg",
        "2nd Edition" 
    ),
    new Book(
        "Learning Concurrent Programming in Scala",
        "http://kbhr.co/concurr-scala",
        "/images/books/learning-concurrent-programming-scala.jpg",
        "Learning <br />Concurrent Programming<br />in Scala"
    ),
    new Book(
        "Programming in Scala: Updated for Scala 2.12",
        "http://kbhr.co/pgmg-in-scala",
        "/images/books/programming-in-scala.jpg",
        "Programming in Scala<br />Updated for Scala 2.12"
    ),
    new Book(
        "Learning Spark",
        "http://kbhr.co/learn-spark",
        "/images/books/learning-spark-book-cover.jpg",
        "Learning Spark"
    )
];


// PROGRAMMING
var pgmgBooks = [
    new Book(
        "A Smarter Way to Learn JavaScript",
        "http://kbhr.co/sm-javascript",
        "/images/books/smarter-way-learn-javascript-3.jpg" ,
        "A Smarter Way to Learn JavaScript"
    ),
    new Book(
        "Cracking the Coding Interview",
        "http://kbhr.co/cracking-code",
        "/images/cracking-coding-interview-book.jpg" ,
        "189 questions &amp; answers"
    ),
    new Book(
        "Grokking Algorithms: An illustrated guide" ,
        "http://kbhr.co/grokking",
        "/images/books/grokking-algorithms-illustrated-guide-2.jpg",
        "Grokking Algorithms" 
    ),
    new Book(
        "Domain-Driven Design",
        "http://kbhr.co/ddd-book",
        "/images/books/domain-driven-design.jpg",
        "Domain-Driven Design"
    ),
    new Book(
        "Clean Code: A Handbook of Agile Software Craftsmanship",
        "http://kbhr.co/clean-code",
        "/images/books/clean-code-book-cover.jpg",
        "Clean Code"
    )
];


// BUSINESS/CAREER
var hismbBooks = [
    new Book(
        "How I Sold My Business, A Personal Diary",
        "http://kbhr.co/hismb",
        "/sites/default/files/HISMB-160pxWide.jpg",
        "my book at amazon"
    ),
    new Book(
        "Rich Dad, Poor Dad",
        "http://kbhr.co/rich-dad",
        "/images/books/rich-dad-poor-dad.jpg",
        "Rich Dad, Poor Dad"
    ),
    new Book(
        "The Everything Store: Jeff Bezos and the Age of Amazon",
        "http://kbhr.co/jeff-bezos",
        "/images/books/jeff-bezos-everything.jpg",
        ""
    ),
    new Book(
        "The Innovator's Dilemma",
        "http://kbhr.co/innov-dilem",
        "/images/books/innovators-dilemma.jpg",
        ""
    ),
    new Book(
        "Tribe of Mentors",
        "http://kbhr.co/tribe-mentors",
        "/images/books/tribe-of-mentors.jpg",
        ""
    ),
    new Book(
        "Outliers: The Story of Success",
        "http://kbhr.co/outliers",
        "/images/books/outliers.jpg",
        ""
    ),
    new Book(
        "How to Win Friends & Influence People",
        "http://kbhr.co/win-friends",
        "/images/books/how-win-friends-influence.jpg",
        ""
    ),
    new Book(
        "How I Raised Myself from Failure to Success in Selling",
        "http://kbhr.co/raised-myself",
        "/images/books/how-raised-myself-frank-bettger.jpg",
        ""
    ),
    new Book(
        "The 7 Habits of Highly Effective People",
        "http://kbhr.co/7-habits",
        "/images/books/7-habits.jpg",
        ""
    ),
    new Book(
        "The $100 Startup: Reinvent the Way You Make a Living",
        "http://kbhr.co/100-startup",
        "/images/books/100-startup.jpg",
        ""
    ),
    new Book(
        "The Lean Startup",
        "http://kbhr.co/lean-startup",
        "/images/books/lean-startup.jpg",
        ""
    )
];


var careerBooks = [
    new Book(
        "The 4-Hour Workweek",
        "http://kbhr.co/four-hour",
        "/images/books/four-hour-work-week.jpg",
        "The 4-Hour Workweek"
    ),
    new Book(
        "How Google Works",
        "http://kbhr.co/how-goog-works",
        "/images/how-google-works.jpg",
        "How Google Works"
    ),
    new Book(
        "How I Sold My Business, A Personal Diary",
        "http://kbhr.co/hismb",
        "/sites/default/files/HISMB-160pxWide.jpg",
        "my book at amazon"
    ),
    new Book(
        "A Survival Guide for New Consultants",
        "http://kbhr.co/new-consultants",
        "/sites/default/files/ASG-160pxWide.jpg",
        "my book at amazon"
    ),
    new Book(
        "Rich Dad, Poor Dad",
        "http://kbhr.co/rich-dad",
        "/images/books/rich-dad-poor-dad.jpg",
        "Rich Dad, Poor Dad"
    ),
    new Book(
        "Tribe of Mentors",
        "http://kbhr.co/tribe-mentors",
        "/images/books/tribe-of-mentors.jpg",
        ""
    ),
    new Book(
        "Outliers: The Story of Success",
        "http://kbhr.co/outliers",
        "/images/books/outliers.jpg",
        ""
    ),
    new Book(
        "How to Win Friends & Influence People",
        "http://kbhr.co/win-friends",
        "/images/books/how-win-friends-influence.jpg",
        ""
    ),
    new Book(
        "How I Raised Myself from Failure to Success in Selling",
        "http://kbhr.co/raised-myself",
        "/images/books/how-raised-myself-frank-bettger.jpg",
        ""
    ),
    new Book(
        "The 7 Habits of Highly Effective People",
        "http://kbhr.co/7-habits",
        "/images/books/7-habits.jpg",
        ""
    )
];



// JAVA
var javaBooks = [
    new Book(
        "Java 8 in Action",
        "http://kbhr.co/java-8-action",
        "/images/books/java-8-in-action.jpg",
        "Java 8 in Action"
    ),
    new Book(
        "Android Programming: The Big Nerd Ranch Guide",
        "http://kbhr.co/android-nerds",
        "/images/books/android-programming-big-nerd-ranch.jpg",
        "3rd Edition"
    ),
    new Book(
        "Effective Java, Updated for Java 9",
        "http://kbhr.co/eff-java-9",
        "/images/effective-java-2017.jpg",
        "Updated for Java 9" 
    ),
    new Book(
        "Core Java SE 9 for the Impatient",
        "http://kbhr.co/core-java-9",
        "/images/books/core-java-se-9-impatient.jpg",
        ""
    )
];


// MINE
var myBooks = [
    new Book(
        "Hello, Scala",
        "http://kbhr.co/hello-scala",
        "/images/hello-scala-book-cover-260h.jpg",
        "Hello, Scala"
    ),
    new Book(
        "Functional Programming, Simplified",
        "http://kbhr.co/fps-book",
        "/images/books/functional-programming-simplified-small.jpg",
        "Functional Programming,<br />Simplified"
    ),
    new Book(
        "How I Sold My Business, A Personal Diary",
        "http://kbhr.co/hismb",
        "/sites/default/files/HISMB-160pxWide.jpg",
        "my book at amazon"
    ),
    new Book(
        "A Survival Guide for New Consultants",
        "http://kbhr.co/new-consultants",
        "/sites/default/files/ASG-160pxWide.jpg",
        "my book at amazon"
    )
];


// APPLE
var appleBooks = [
    new Book(
        "Steve Jobs, by Walter Isaacson",
        "http://kbhr.co/steve-jobs-book",
        "/images/books/steve-jobs-wi.jpg",
        ""
    ),
    new Book(
        "The Presentation Secrets of Steve Jobs",
        "http://kbhr.co/steve-jobs-1",
        "/images/books/steve-jobs-presentations.jpg",
        ""
    ),
    new Book(
        "Becoming Steve Jobs",
        "http://kbhr.co/be-steve-jobs",
        "/images/books/becoming-steve-jobs.jpg",
        ""
    ),
    new Book(
        "Elon Musk: Tesla, SpaceX, and the Quest for a Fantastic Future",
        "http://kbhr.co/elon-musk-book",
        "/images/books/ekon-musk.jpg",
        ""
    ),
    new Book(
        "Jony Ive: The Genius Behind Apple's Greatest Products",
        "http://kbhr.co/jony-ive-book",
        "/images/books/jony-ive.jpg",
        ""
    ),
    new Book(
        "Insanely Simple: The Obsession That Drives Apple's Success",
        "http://kbhr.co/insan-simple",
        "/images/books/insanely-simple.jpg",
        ""
    ),
    new Book(
        "Creativity, Inc. (Pixar and Steve Jobs)",
        "http://kbhr.co/creativ-pixar",
        "/images/books/creativity-inc.jpg",
        ""
    ),
    new Book(
        "Einstein: His Life and Universe",
        "http://kbhr.co/einstein-life",
        "/images/books/einstein-wi.jpg",
        ""
    ),
    new Book(
        "Steve Jobs: The Man Who Thought Different",
        "http://kbhr.co/sj-thought-diff",
        "/images/books/steve-jobs-thought-different.jpg",
        ""
    ),
    new Book(
        "The Innovators",
        "http://kbhr.co/innovators",
        "/images/books/innovators-wi.jpg",
        ""
    )
];


// [uri: arrayOfBooks]
let booksMap = {
    "andr" : javaBooks,
    "appl" : appleBooks,
    "care" : careerBooks,
    "desi" : appleBooks,
    "drup" : pgmgBooks,
    "gimp" : popularBooks,
    "hism" : hismbBooks,
    "ipho" : appleBooks,
    "java" : javaBooks,
    "linu" : popularBooks,
    "mac-" : appleBooks,
    "maco" : appleBooks,
    "mysq" : pgmgBooks,
    "perl" : pgmgBooks,
    "pers" : popularBooks,
    "phot" : popularBooks,
    "php/" : pgmgBooks,
    "scal" : scalaBooks
};









