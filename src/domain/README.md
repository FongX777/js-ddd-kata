# Domain Model

https://www.notion.so/specification/Modeling-Rules-6f2cc03c1bdc4fe2b226d5427de30b45

- File convention:
  - location: `src/domain/xxx/index.js`
  - testing files location: `src/domain/xxx/__test__/index.test.js`
  - shared: `src/domain/_shared/locale.js`
- 若 property 為 object，一律開新 class 轉為 value object
- 若需要外部套件 (`Date`, `moment`, `uuid`) ，則直接 `require` 。如果測試需要 mock 的話，就新增一個 `setXXX` 之後 mock (TO BE FIXED: where to put dependency)

```javascript
const moment = require('moment');

class A {
  constructor({ id, date }) {
    this.id = id;
    this.date = date;
  }

  setMoment() {}

  toNow() {
    this.date = A._moment();
  }
}

A._moment = moment;
A._isEnabled = isEnabled;

const test = () => {
  A._moment;
  A._isEanbled = () => true;
};
```

- `module.exports` 時把所有 domain objects 都 exports 出去 (包含 entities, value objects)。
  因為之後 repository 都會用到

```javascript
module.exports = {
  Entity,
  ValueObject1,
  ValueObject2,
};
```

- 盡量避免 setter (ex: `setIsEnabled(flag)` → `enable()` + `disable()` )
- Enum 放到 class 後面用 `ClassA.XXX_ENUM = {}` 的形式表示。如果參數列需要此 Enum 可以用 `@param {Class.XXX_ENUM} xxx` 表達 jsdoc

```javascript
class A {
  /**
   * @param {A.STATUS_ENUM} status
   */
  constructor(status) {
    this.status = status;
  }
}
/** @enum {number} - status of A */
A.STATUS_ENUM = {
  ON: 1,
  SUSPEND: 0,
  OFF: -1,
};
```

- `new` 的概念為「將資料轉成 domain object 」，與「新增」不同。如果該 class instance 在「新增」時有一些業務規則如預設值(`status = 0`)、後處理 (`string.trim()`) ，則建議使用 `static create` 。

  `static create` 好處是擁有更好的描述性與封裝性，避免過多實作細節洩漏，且可以針對外面的 usecase 來調整參數。此外，有時候「新增」會有一些業務邏輯，
  如商店金流建立時 `status` 預設為 0 。

  不過如果該 domain object 沒有特別的 `create` 邏輯的話，就不必特別用 `static create`

  PS domain object 泛指 aggregate, entity, value object
