# Add Calculator Kata

![cover](https://www.allaboutcircuits.com/uploads/articles/red-green-refactor.png)

## Step 1: 2 + 2 = 4

Example:

```js
test('2+2 = 4', (t) => {
  const result = add(2 + 2);
  t.is(result, 4);
});
```

## Step 2: Only accept positive value and 0

- Good: 0, 1, 2, 3
- Bad: -1, -2, -3 -> Invalid Value Error

## Step 3: Input can also be a string with comma separated each value

- Good: '0,1,2,3' -> 6
- Bad: '0,-1,2,3' -> Invalid Value Error
- Bad: '0;1;2,3' -> Invalid Separator Error

Example :

```js
test('add values in the string', (t) => {
  const result = add('2,3,4');
  t.is(result, 9);
});
```

## Step 4: Max 1000 values in a string

- Good: '0,1,[...other 998 values]'
- Bad: '0,1,[...other 1000 values]' -> Max Value Count Excess Error

## Step 4: new line '\n' is also a valid separator

Example :

```js
test('add values in the string', (t) => {
  const result = add('2\n3,4');
  t.is(result, 9);
});
```
