---
title: "Notes"
---

### Why Swift?

Swift is designed to be:
> a programming language to empower everyone to turn their ideas into apps on any platform.


Swift was designed by Apple and has taken over (from Objective-C) as the go-to language for programming Apple platforms. Whilst the vast majority of Swift code is written for iOS and MacOS, its reach doesn't end there. I want to show you today that Swift is a **powerful** and **usable** general-purpose programming language that is not constrained to Apple platforms.

Swift is open source. That is to say, anybody can contribute to its development by filing issues, proposing new features and changes, and by directly contributing code. You can find the [compiler](https://github.com/apple/swift), [standard library](https://github.com/apple/swift/tree/master/stdlib/public/core) and [core libraries](https://github.com/apple/swift-corelibs-foundation) on GitHub. If you choose to, you can participate in the process of shaping the future of this young language.

If you're interested in mobile app development then Swift programming is an essential skill right now but even outside of that context Swift is a great example of a modern programming language. Learning Swift may help you understand many other languages from which it draws inspiration.

### What we will cover

- Swift basic syntax
- Stand-out Swift features
- Building an example app

This workshop covers most of the content of the 'A Swift Tour' section of [The Swift Programming Language](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/index.html). This is the go-to resource for learning the interesting bits of Swift and if you're interested in learning more then that should be your first stop.

### References

Most of the time when you write Swift, you are using a combination of:

- built in Swift features (e.g. `Array`s)
- Swift Standard Library features (e.g. Sorting `Array`s)
- `Foundation` library features (e.g. Separating a `String` by, say, commas)



If you're on a Mac, Xcode is the best way of reading the documentation for these things. Open Xcode and go to Help > Developer Documentation and you can search for what you need.

If you're not on a Mac, it can be tricky to find the right docs though they are online:

- [Swift Standard Library Documentation](https://developer.apple.com/documentation/swift)
- [Foundation Documentation](https://developer.apple.com/documentation/foundation)

In practice, Google is usually a quicker way to find the information you need.

## Getting started

To follow along with this workshop, you'll first need to download [the example repository](https://github.com/hackersatcambridge/workshop-intro-to-swift/archive/master.zip). Unzip it into your machine open the folder in your terminal of choice.

Alternatively, you can clone the example repository:

```bash
$ git clone https://github.com/hackersatcambridge/workshop-intro-to-swift
Cloning into workshop-intro-to-git...
$ cd workshop-intro-to-git
```

### Running Swift
We'll also need to make sure we can run Swift

#### REPL mode

Runs a 'read, evaluate, print' loop. Type instructions and press enter to run them. Note that this mode may not work in Linux containers (but should do on native Linux machines).

```bash
$ swift
```

#### Interpreted mode

File is read and executed line-by-line.

```bash
$ swift test.swift
```

#### Compiled mode

The swift file is compiled into a native executable.

```bash
$ swiftc test.swift -o test
$ ./test
```

In this workshop we'll be building a small example app that touches on many of the features of Swift that we're going to cover. The app is a directory of public toilets in Cambridge. We'll tell it where we are and a few other details and it'll give us our nearest public toilet!

In your terminal, navigate to `examples/Lavy`. Make sure you can run it by running:

```swift
$ swift run
```
This is running `swiftc` on a bunch of different files for us and then running the compiled binary. Handy! (this is a feature of 'Swift Package Manager' which we won't talk too much about here but you can read more [here](https://swift.org/package-manager/)).

You should see something like the following:

```
Compile Swift Module 'Lavly' (5 sources)
Linking ./.build/x86_64-apple-macosx10.10/debug/Lavly
      .__   .-".
   (o\"\  |  |
      \_\ |  |
     _.---:_ |
    ("-..-" /
     "-.-" /
       /   |
       "--"  Welcome to Lavly!
Enter your latitude: 
```
You'll notice that some features of the app aren't implemented yet. You're going to implement them along the way. I'll mention when you know what you need to know to implement certain bits. Open the Lavly project in your favourite text editor and lets get started.


## Basic syntax

Let's take a look at some of the basic syntax of Swift. 

---
**Note:** *After this section you will be able to complete TODO items 1-5 in the code*

---

Unlike other languages, semicolons are optional and generally not preffered.

### Values

Values are constant variables which never change value (are 'immutable'). They are defined with the `let` keyword. Attempts to change the value of a constant will fail at [*compile time*](https://pc.net/helpcenter/answers/compile_time_vs_runtime).

```swift
let name = "Richard"
name = "Hal" // error: cannot assign to value: 'name' is a 'let' constant
```

### Variables

Variables store values which *can* be changed (are 'mutable'). They are defined with `var`.

```swift
var otherName = "Richard"
otherName = "Hal" // This succeeds
```

### Explicitly declaring type

We can define the 'type' of a variable explicitly using a colon followed by the type name:

```swift
var title: String
title = "Mr"
```
Notice that we didn't *have* to do this before since Swift can *infer* the type of the variable from the type of the value that you assign to it. e.g. if we assign a String to `title` then it knows that `title` should be of type `String`

In this case, we have declared the variable before initialising it with a value so we do need to explicitly tell Swift what it's type is going to be.

### Array
Some other language require arrays to be of a fixed size:

```
int intArray[] = new integer[4];
// Fixed size, cannot expand
```

This doesn't happen in Swift. We can add elements to arrays on the fly and Swift will efficiently handle changing the size of the array for us.

```swift
var intArray: [Int]
intArray = [1, 2, 3]
intArray += [4, 5, 6]
// intArray == [1, 2, 3, 4, 5, 6]
// intArray[0] == 1
```

### Control Flow
#### For loops

In other languages such as Java, we would use a `for` construct like this:

```java
// Some other language...
for (int i = 0; i < n; i++) {
  // Use i
}
```

This is a bit clunky when our intention is to do something with each value from 0 to `n`. In Swift, we utilise the native ranges, which expresses loops in a more concise and expressive way.

```swift
let n = 5
for i in 0 ..< n {
  print(i)
}
// 0
// 1
// 2
// 3
// 4
```
Here `0 ..< n` indicates the *range* of numbers from 0 up to (but not including) `n` and the `for i in 0 ..< n` iterates through each value in that range.
We can also do an inclusive range like so: `0 ... n`

#### Switch statements

`switch` statements allow us to branch our code based on the values of a variable or expression. Here we want to produce a response based on the value of a `favouriteFood` string.

```swift
let favouriteFood = "ratatouille"

switch favouriteFood {
  case "salad":
    print("Nobody likes a liar")
  case "candy floss":
    print("You’ve a sweet tooth")
  default:
    print("Great choice!")
}
```

Note these cases cover *all* possibilities and the Swift compiler knows that. In fact, it won't let us write a `switch` statement that doesn't cover all possibilities. Let's see what happens when we try to remove that `default` case:


```swift
...
switch favouriteFood {
  case "salad":
    print("Nobody likes a liar")
  case "candy floss":
    print("You’ve a sweet tooth")
}
// error: switch must be exhaustive, consider adding a default clause
```

We can combine ranges and `switch` statements to check if a value is in a certain range:

```swift
let yourAge: Int = 20 // Set this to be your age

switch yourAge {
  case 0: // This will only match the number 0 
    print("You are a baby")
  case 1 ... 3: // This will match numbers 1, 2 and 3.
    print("You are a toddler")
  case 4 ... 11:
    print("You are a child")
  case 12 ..< 18: // Here we are checking for a range which is >= 12, but < 18.
    print("You are a teenager")
  case 18...: // As no upper bound is specified, this matches all >= 18
    print("You are an adult")
  default: // For cases when there is a negative number
    print("You can't have a negative age")
}
```

#### Guard Statements
Whilst we're talking about control flow, I want to show you an example of where the Swift compiler makes life a lot easier for us sometimes.

```swift
guard(divisor != 0) else {
  print("Can't divide by zero")
  return
}
print(5 / divisor)
return
```

*Guard statements* are like if statements but instead of executing the code inside the block when the condition *does* hold, a `guard` statement makes sure that the condition holds and then runs the code inside the block otherwise.

Here's the cool bit: the type system will make sure that the else block either never terminates or it gets us out of the current scope. In this case, that has been done with a `return` but it could have been done by `throw`ing an error or  `break`ing or `continue`ing out of a current loop iteration.

> Why can't we just use an `if`?

```
if(divisor == 0) {
	print("Can't divide by zero")
	// Oops!
}
print(5 / divisor)
return
```
Whoops! We forgot to return early when we recognised the 0. This compiles just fine but then crashes at runtime when we try to do this division. With guard on the other hand:

```
guard(divisor != 0) else {
  print("Can't divide by zero")
}
print(5 / divisor)
return

// error: 'guard' body may not fall through, consider using a 'return' or 'throw' to exit the scope
```
The compiler has caught this for us and saved us from another runtime error. Hooray!

### Optionals

In most other languages, any variable can potentially be empty (i.e. containing `null`).

```java
// Some other language...
TrueLove richardsLove = null
```
Here we are representing Richard's true love in this variable `richardsLove`. It so happens that Richard doesn't have a true love right now so this is set to null.

When we come to use this value, we make sure to remember to check if it's null.

```java
// Some other language...
if (richardsLove == null) {
  // Do nothing
} else {
  // sendRoses expects a TrueLove parameter
  sendRoses(richardsLove)
}
```

But what if we forget to make this check?

```java
// Some other language...
TrueLove richardsLove = null
...
// forget to check for null
// sendRoses expects TrueLove param
sendRoses(richardsLove)
```

The compiler will let you do this but it will catch fire at runtime! Since `sendRoses` expects a TrueLove parameter, this operation fails resulting in a `NullPointerException`. These are bugs that we might not catch before we ship our code!

In Swift, we define that a variable can be optional with a `?` next to the type.
Optionals can be safely used with the `if let` construct, where the body is run only when the variable isn't `nil`. This is called *optional binding*.

```swift
let richardsLove: TrueLove? = nil

// sendRoses expects TrueLove param
// Do an ‘optional binding’
if let recipient = richardsLove {
  sendRoses(to: recipient)
}
```
`recipient` is set to the value of `richardsLove` if it is not `nil`. Within the if statement, `recipient` has type `TrueLove` (i.e. non-optional)

#### Working with Optionals
These optional things come up a lot so it's useful to have a few ways of manipulating them.

**Default Values**

We can define default values with the `??` operator. In the following example, when `richardsLove` doesn't exist, it will assign `TrueLove("Taylor Swift")`.

```swift
let richardsLove: TrueLove? = nil

let definiteLove = richardsLove ?? TrueLove("Taylor Swift")
// definiteLove: TrueLove (non-optional)
```

**Force Unwrapping**

If we are 100% totally sure the optional isn't `nil`, we can **force unwrap** with `!`.

```swift
let definiteLove = richardsLove!
```
Again, `definiteLove` here would be of non-optional type because we have force unwrapped it. Note in this case that we could not assume that richardsLove would not be nil so this example would crash at runtime.

We call this force unwrapping because it's as if the type is 'wrapped' in this optional box and we want to get it out.


**Optional Chaining**

What if we wanted to get the name of `richardsLove`? Of ocurse this is also an optional value since Richard may not have a true love. We can't just say `richardsLove.name` since `richardsLove` could be `nil` and `nil` doesn't know how to deal with `.name`. This is where **optional chaining** comes in. 

```
let richardsLoveName = richardsLove?.name
```
With the inclusion of that little question mark, this will evaluate to `nil` if `richardsLove` is `nil`, and the name of the `TrueLove` otherwise. 

Now say for some reason we wanted to get the *middle* name of Richard's true love and then convert to lowercase. Richard might not have a true love, his true love might not have a middle name, but optional chaining has us covered:

```
let loverMiddleName = richardsLove?.middleName?.lowercased()
```

If Richard doesn't have a true love, *or* if he does but they don't have a middle name, then a 'link in the chain' is missing and the whole expression evaluates to nil. Otherwise we get the value we wanted.

### Functions and Closures

#### Functions
We can define functions with the `func` keyword. The argument and return types are required. If a function does not return a value, don't give a return type.

```swift
func checkAnagram(string1: String, string2: String) -> Bool {
  return string1.sorted() == string2.sorted()
}
```
This function checks if two strings are anagrams of one another.

The function can then be called like so:

```swift
checkAnagram(string1: "rat", string2: "tar") // true
checkAnagram(string1: "rat", string2: "ear") // false
```
---
**Exercise:**
*You can now complete TODO items 1-5 in the Lavly Code*

---

Having to type `string1` and `string2` when we use this function seems unnecessary, it would be clear from context what we mean if we called: `checkAnagram("rat", "tar")` but obviously within the body of the function we still need to have access to `string1` and `string2`.

Swift lets us define both a 'parameter name' (the thing you use in the body of the function) and an 'argument label' (the label you use when *calling* the function).

For example we could call them `left` and `right` to the outside world and not change our body:

```swift
func checkAnagram(left string1: String, right string2: String) -> Bool {
  return string1.sorted() == string2.sorted()
}
```
And use the function like so:

```
checkAnagram(left: "rat", right: "tar") // true
```
By default the argument label is the same as the parameter name. In this case it would make sense not to have an argument label because the things we are passing in to this function are clear from context (we know an anagram is a relation between two strings). We can use the `_` symbol to specify this:

```swift
func checkAnagram(_ string1: String, _ string2: String) -> Bool {
  return string1.sorted() == string2.sorted()
}
```
And use the function like so:

```
checkAnagram("rat", "tar") // true
```
Much neater!

---
**Exercise:**
*You can now complete TODO item 6 in the Lavly Code*

---

#### Closures
Closures are like functions but without a name. Let's define a closure that takes an integer and returns whether it is even or not:

```swift
let isEven = { (number: Int) -> Bool in
	return number % 2 == 0
}
```

This can then be called like so:

```swift
isEven(3) // false
```
Just the same as normal function syntax! So why would you use closures?

Closures really come in to their own when you have a function that you're only going to need once. Arrays in Swift have a `filter` method which take a closure as an argument. This closure has to return a `Bool`. The method runs this function on each element in the array and gives us back only the elements for which the function returned `true`:

```swift
[1, 8, 5, 3, 3, 6, 7].filter({ (number: Int) -> Bool in
	return number % 2 == 0
})
// [8, 6]
```

Swift lets us write this in a much more concise way.

Swift knows that this is a filter on an array of `Int`s so we don't need to explicitly specify that it takes `Int`s or returns `Bool`:

```swift
[1, 8, 5, 3, 3, 6, 7].filter({ number in
	return number % 2 == 0
})
```
Since the body of our closure is only one line, Swift lets us omit the `return` statement:

```swift
[1, 8, 5, 3, 3, 6, 7].filter({ number in
	number % 2 == 0
})
```

Here we've given the parameter to our closure the name `number` but if we don't give parameters names, Swift gives them default names of `$0`, `$1` etc. in order:

```swift
[1, 8, 5, 3, 3, 6, 7].filter({ $0 % 2 == 0 })
```

Finally, when the last parameter to a function is a closure, Swift lets us break it out of the round brackets:

```swift
[1, 8, 5, 3, 3, 6, 7].filter { $0 % 2 == 0 }
```
Neat!
Every step along the way here compiles and gives the same result as our original  filter code.

**Another example**

The `map` method on `Array` runs the given closure on each element of an `Array` and gives us an `Array` of the results. Here we use it to double each element:

```swift
[3, 4, 7].map { $0 * 2 }
// [6, 8, 14]
```

---
**Exercise:**
*You can now complete TODO items 7-10 in the Lavly Code.*

---

**Note:** *The remainder of these notes cover some other interesting bits of Swift to help you understand the rest of the code in the project*

---

## Classes, Structures, Enumerations

### Classes

A class is like a template for an object. We define one with the `class` keyword.
Classes can contain properties (values, variables) and methods (functions).
`init` is a special method which defines the constructor.

```swift
class Student {
  let name: String
  var triposPart: String

  func read() {
    print("I'm reading and definitely not watching Netflix")
  }

  init(name: String, triposPart: String) {
    self.name = name
    self.triposPart = triposPart
  }
}
```

We can then use this class and its initialiser like so:

```swift
let richard = Student(name: "Richard", triposPart: "1B")
richard.read()
// "I'm reading and definitely not watching Netflix"
```

### Structures

Structs are similar to classes. We can define properties, methods, and initialisers.

```swift
struct Instructor {
  let name: String
  var module: String

  init(name: String, lecturingIn module: String) {
    self.name = name
    self.module = module
  }

  func teach() {
    ...
  }
}

let hal = Instructor(name: "Hal", lecturingIn: "Swift")
hal.teach()

```

If we do not provide an initialiser, we get a **default initialiser** for free that simply takes values for all the stored properties and assigns them:

```swift
struct Instructor {
  let name: String
  var module: String
  func teach() {
    ...
  }
}

let hal = Instructor(name: "Hal", module: "Swift")
hal.teach()

```
Wait... so what's the difference between Structs and Classes?

- Classes are 'reference types', structs are 'value types'. See here for a thorough explanation: [https://developer.apple.com/swift/blog/?id=10](https://developer.apple.com/swift/blog/?id=10)
- Classes have additional features:
  - Inheritance (`struct`s can use `protocol`s, something we'll discuss later)
  - Type casting
  - Deinitializers

---
**Exercise:**
*Look at the implementation of the `Toilet` model in `Toilet.swift`*

---

### Enumerations

Imagine we are writing a poker app and we need to encode the set of possible card suits. In another language we might do something like this:

```swift
let SUIT_SPADES   = 0
let SUIT_CLUBS    = 1
let SUIT_HEARTS   = 2
let SUIT_DIAMONDS = 3

let aceOfSpadesSuit = SUIT_SPADES
// Yucky!
```
Here we've assigned integers to each possible suit so that each has a unique value. The trouble here is that the type of aceOfSpacesSuit, as far as the compiler is concerned, is an integer. We might might have some code somewhere that relies on suits being between 0 and 3 but someone could easily accidentally set `queenOfHeartsSuit` to 4 and then we'll be in trouble!

In Swift we can define this in a way that is easier to read for us, and that tells the compiler what's going on:

```swift
enum CardSuit {
  case spades
  case clubs
  case hearts
  case diamonds
}

let aceOfSpadesSuit = CardSuit.spades
```
These aren't integers or strings, they are a new type of value that we have created to represent card suits. Neat!

Enums are more powerful than they first let on. We can add methods and initialisers if we want to! Say we want to define a nicely formatted description of each suit. Let's define a function:

```swift
enum CardSuit {
  case spades, clubs, hearts, diamonds

  func suitName() -> String {
	switch self {
	case CardSuit.spades:
		return "Spades"
	case CardSuit.clubs:
		return "Clubs"
	case CardSuit.hearts:
		return "Hearts"
	case CardSuit.diamonds:
		return "Diamonds"
	}
  }
}
```
`self` here refers to this specific instance of CardSuit.

Note that we haven't added a default case to this switch like we have done in the past but this compiles just fine because the compilers knows that these are the only cases of CardSuit.

The Swift compiler is smart enough to infer a type for the enums so actually we don't need to put `CardSuit` in every case:

```swift
enum CardSuit {
  case spades, clubs, hearts, diamonds

  func suitName() -> String {
    switch self {
      case .spades: // <- Note didn't write 'CardSuit'
        return "Spades"
      case .clubs:
        return "Clubs"
      case .hearts:
        return "Hearts"
      case .diamonds:
        return "Diamonds"
    }
  }
}
```

Enums also let us associate values with cases.
This is an example from a food menu app. Prices may be known and have a value but may also be unconfirmed (e.g. for a soup of the day). We can model this using an enum:

```swift
enum Price {
  case value(Int)
  case unconfirmed

  func description() -> String {
    switch self {
      // The `let x` here gets the value out for us so we can use it
      case .value(let x):
        return "Price is \(x) pence"
      case .unconfirmed:
        return "See the blackboard for the price"
      }
    }
}

let caviarPrice = Price.value(2300)
let soupOfTheDayPrice = Price.unconfirmed
...
```

**Note:**
*Does this look like anything we've seen before? It turns out Optional is actually implemented behind the scenes as an enum.*

### Extensions

Extensions allow us to add additional methods to existing classes, structs and enums.

```swift
extension String {
  func isPalindrome() -> Bool {
    return self == String(self.characters.reversed())
  }
}

// "hello".isPalindrome() == false
// "racecar".isPalindrome() == true
```

### Protocols
Protocols let us define a set of requirements that other types can declare conformance too. For example, the [standard library](https://github.com/apple/swift/blob/master/stdlib/public/core/Equatable.swift#L167) includes an `Equatable` protocol:

```swift
public protocol Equatable {
  static func == (lhs: Self, rhs: Self) -> Bool
}
```

This protocol has only one requirement, an equality function `==`. The built in [`Int`](https://developer.apple.com/documentation/swift/int) type conforms to this protocol and that's why we can use things like this:

```swift
[1, 3, 4].contains(3) // true
```
Under the hood, the `contains` function is running the equality function on each element until it finds a match. It wouldn't be able to do this if `Int` wasn't Equatable.

We can make our own types conform to `Equatable` simply by providing that one static method and *declaring conformance* with "`: Equatable`":

```swift
struct Instructor: Equatable {
  let name: String
  var module: String
  static func == (lhs: Instructor, rhs: Instructor) -> Bool {
  	return lhs.name == rhs.name && lhs.module == rhs.module
  }
}
```
And now we can compare two `Instructor`s with `==`

Protocols are more powerful than they first appear:

- Types can conform to multiple protocols
- Extensions on protocols allow you to define default behaviours for types that conform to the protocol
- Protocols can conform to other protocols
- *Value* types (such as `struct` types, and `enum` types) can conform to protocols, as we've just seen

With all these features, [Protocol-Oriented Programming](https://m.youtube.com/watch?v=g2LwFZatfTI) is a real alternative (or accompaniment) to Obect-Oriented Programming that can make for simpler code. 

---
**Exercise:** *Check out the further reading links for things that might interest you. What other features would you want to add to this app?* 

---
