# Cooper Union Automated Hydroponics System

_Note: Cooper Union Automated Hydroponics is in development and is not ready for commercial use. Acedemic use is permitted._

# Getting Started

## Installation

Before starting you need to to install the package management tools and database tools Oyster Traceability uses.

### yarn

Install yarn by following the instructions [here](https://yarnpkg.com/en/docs/install#mac-stable).

### node.js

node.js should have been installed when you install yarn and npm. You can check by running

```
node -v
```

in your terminal window. If node isn't installed you can follow the instructions [here](https://nodejs.org/en/).

### mongo

Mongo is the noSQL database Oyster Traceability uses.

Install mongo by following the instructions [here](https://docs.mongodb.com/manual/installation/#tutorial-installation).
Once you get mongo installed open a terminal window and run

```
mongod
```

to initialize the mongo shell. Then in another terminal run

```
mongod
```

which runs the mongo shell. To quit the shell run

```
quit()
```

in the previous terminal.

## Setting up the project

### Download the Repository

You can download the repository by typing in

```
git clone https://github.com/dhvanilshah/cooper-hydroponics.git
```

into the terminal.

### Installing Packages

Move to the backend directory in cooper-hydroponics. Run the command

```
yarn
```

then

```
yarn run start
```

when you first clone the repository and every time a new dependency is installed. This will install all of the packages currently used in Cooper Hydroponics.
