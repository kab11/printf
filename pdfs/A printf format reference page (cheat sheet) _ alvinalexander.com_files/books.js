function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

var books = [

    `<div class="lhs-book" align="center"><a
     href="http://kbhr.co/rich-dad" rel="nofollow"><img
     alt="Rich Dad, Poor Dad"
     title="Rich Dad, Poor Dad"
     src="/sites/default/files/inline-images/rich-dad-poor-dad.jpg"
     width="145" />
     <br />Rich Dad, Poor Dad</a>
     </div>`,

    `<div class="lhs-book" align="center"><a
     href="http://kbhr.co/power-habit" rel="nofollow"><img
     alt="The Power of Habit"
     title="The Power of Habit"
     src="/sites/default/files/inline-images/power-of-habit.jpg"
     width="145" />
     <br />The Power of Habit</a>
     </div>`,

    `<div class="lhs-book" align="center"><a
     href="http://kbhr.co/four-hour" rel="nofollow"><img
     alt="The 4-Hour Workweek"
     title="The 4-Hour Workweek"
     src="/sites/default/files/inline-images/four-hour-work-week.jpg"
     width="145" />
     <br />The 4-Hour Workweek</a>
     </div>`,

    `<div class="lhs-book" align="center"><a
     href="http://kbhr.co/saf-or" rel="nofollow"><img
     alt="Safari at O'Reilly"
     title="Safari at O'Reilly"
     src="/sites/default/files/inline-images/or-safari-140x280.jpg"
     width="145" />
     <br />Safari at O'Reilly</a>
    </div>`,

    `<div class="lhs-book" align="center"><a
     href="http://kbhr.co/tg-red" rel="nofollow"><img
     alt="ThinkGeek sale"
     title="ThinkGeek sale"
     src="/sites/default/files/inline-images/tg-red-sale.jpg"
     width="145" />
     <br />ThinkGeek sale</a>
    </div>`,

    `<div class="lhs-book" align="center"><a
     href="http://kbhr.co/tg-coder" rel="nofollow"><img
     alt="Coder Goodies at ThinkGeek"
     title="Coder Goodies at ThinkGeek"
     src="/sites/default/files/inline-images/tg-coder-goodies-120x240_0.jpg"
     width="145" />
     <br />ThinkGeek</a>
    </div>`,

    `<div class="lhs-book" align="center"><a 
     href="http://kbhr.co/cracking-code" rel="nofollow"><img 
     alt="Cracking the Coding Interview" 
     title="Cracking the Coding Interview" 
     src="/images/cracking-coding-interview-book.jpg" 
     width="145" />
     <br />189 questions &amp; answers</a>
    </div>`,

    `<div class="lhs-book" align="center"><a 
     href="http://kbhr.co/grokking" rel="nofollow"><img 
     alt="Grokking Algorithms: An illustrated guide" 
     title="Grokking Algorithms: An illustrated guide" 
     src="/sites/default/files/inline-images/grokking-algorithms-illustrated-guide-2.jpg"
     width="145" />
     <br />Grokking Algorithms
     <br />(an illustrated guide)</a>
    </div>`,
    
    `<div class="lhs-book" align="center"><a 
     href="http://kbhr.co/ddd-book" rel="nofollow"><img 
     alt="Domain-Driven Design" 
     title="Domain-Driven Design" 
     src="/sites/default/files/inline-images/domain-driven-design.jpg" 
     width="145" />
     <br />Domain-Driven Design</a>
    </div>`,
    
    `<div class="lhs-book" align="center"><a 
     href="http://kbhr.co/eff-java-9" rel="nofollow"><img 
     alt="Effective Java, Updated for Java 9" 
     title="Effective Java, Updated for Java 9" 
     src="/images/effective-java-2017.jpg" 
     width="145" />
     <br />Updated for Java 9</a>
    </div>`,

    `<div class="lhs-book" align="center"><a 
     href="http://kbhr.co/how-goog-works" rel="nofollow"><img 
     alt="How Google Works"
     title="How Google Works"
     src="/images/how-google-works.jpg" 
     width="145" />
     <br />How Google Works</a>
    </div>`,
    
    `<div class="lhs-book" align="center"><a 
     href="http://kbhr.co/hello-scala" rel="nofollow"><img 
     alt="Hello, Scala"
     title="Hello, Scala (An introduction to Scala programming)"
     src="/images/hello-scala-book-cover-260h.jpg" 
     width="145" />
     <br />Hello,&nbsp;Scala</a>
    </div>`,
    
    `<div class="lhs-book" align="center"><a 
     href="http://kbhr.co/fps-book" rel="nofollow"><img 
     alt="Functional Programming, Simplified"
     title="Functional Programming, Simplified"
     src="/sites/default/files/inline-images/functional-programming-simplified-small.jpg" 
     width="145" />
     <br />Functional Programming,
     <br />Simplified (PDF)</a>
    </div>`,
    
    `<div class="lhs-book" align="center"><a 
     href="http://kbhr.co/scala-imp" rel="nofollow"><img 
     alt="Scala for the Impatient (2nd Edition)" 
     title="Scala for the Impatient (2nd Edition)" 
     src="/sites/default/files/inline-images/scala-for-impatient.jpg" i
     width="145" />
     <br />Scala for the Impatient
     <br />(2nd Edition)</a>
    </div>`,
    
    `<div class="lhs-book" align="center"><a 
     href="http://kbhr.co/sm-javascript" rel="nofollow"><img 
     alt="A Smarter Way to Learn JavaScript"
     title="A Smarter Way to Learn JavaScript"
     src="/sites/default/files/inline-images/smarter-way-learn-javascript-3.jpg"i
     width="145" />
     <br />A Smarter Way to Learn JavaScript</a>
    </div>`,
    
    `<div class="lhs-book" align="center"><a 
     href="http://kbhr.co/concurr-scala" rel="nofollow"><img 
     alt="Learning Concurrent Programming in Scala"   
     title="Learning Concurrent Programming in Scala"   
     src="/sites/default/files/inline-images/learning-concurrent-programming-scala.jpg" 
     width="145" />
     <br />Learning <br />Concurrent Programming
     <br />in Scala</a>
    </div>`,
    
    `<div class="lhs-book" align="center"><a 
     href="http://kbhr.co/pgmg-in-scala" rel="nofollow"><img 
     alt="Programming in Scala: Updated for Scala 2.12" 
     title="Programming in Scala: Updated for Scala 2.12" 
     src="/sites/default/files/inline-images/programming-in-scala.jpg"
     width="145" />
     <br />Programming in Scala
     <br />Updated for Scala 2.12</a>
    </div>`,
    
    `<div class="lhs-book" align="center"><a 
     href="http://kbhr.co/hismb" rel="nofollow"><img 
     alt="How I Sold My Business, A Personal Diary" 
     title="How I Sold My Business, A Personal Diary" 
     src="/sites/default/files/HISMB-160pxWide.jpg" 
     width="145" />
     <br />my book at amazon</a>
    </div>`,
    
    `<div class="lhs-book" align="center"><a 
     href="http://kbhr.co/new-consultants" rel="nofollow"><img 
     alt="A Survival Guide for New Consultants" 
     title="A Survival Guide for New Consultants" 
     src="/sites/default/files/ASG-160pxWide.jpg"
     width="145" />
     <br />my book at amazon</a>
    </div>`,

    `<div class="lhs-book" align="center"><a
     href="http://kbhr.co/learn-spark" rel="nofollow"><img
     alt="Learning Spark"
     title="Learning Spark"
     src="/sites/default/files/inline-images/learning-spark-book-cover.jpg"
     width="145" />
     <br />Learning Spark</a>
    </div>`,

    `<div class="lhs-book" align="center"><a
     href="http://kbhr.co/core-java-9" rel="nofollow"><img
     alt="Core Java SE 9 for the Impatient"
     title="Core Java SE 9 for the Impatient"
     src="/sites/default/files/inline-images/core-java-se-9-impatient.jpg"
     width="145" /></a>
    </div>`,

    `<div class="lhs-book" align="center"><a
     href="http://kbhr.co/clean-code" rel="nofollow"><img
     alt="Clean Code: A Handbook of Agile Software Craftsmanship"
     title="Clean Code: A Handbook of Agile Software Craftsmanship"
     src="/sites/default/files/inline-images/clean-code-book-cover.jpg"
     width="145" /></a>
    </div>`,

    `<div class="lhs-book" align="center"><a 
     href="http://kbhr.co/scala-cookbook" rel="nofollow"><img 
     alt="Scala Cookbook" 
     title="Scala Cookbook" 
     src="/sites/default/files/inline-images/scala-cookbook-5.jpg" 
     width="145" />
     <br />Scala Cookbook</a>
    </div>`

];


