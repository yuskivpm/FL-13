const DATA_URL = 'https://roman4ak.github.io/fe-oop-lab/mocks/epms.json';
const ROOT_NODE_ID = 'root';

const STATUS_EMPLOYEE = 'employee';
const STATUS_DEVELOPER = 'developer';
const STATUS_RM = 'resource-manager';

const CLASS_POOL = 'pool';
const CLASS_AVERAGE = 'average-item'
const CLASS_WARNING = 'warning-item'

const GLOBAL_POOL_NAME = 'Company';

const LOW_PERFORMANCE = 'low';
const TOP_PERFORMANCE = 'top';

const TAG_FOR_TAB = 'div';
const TAG_FOR_POOL = 'ul';
const TAG_FOR_ITEM = 'li';

const TITLE_LINE_STYLES = { className: 'title' };

const rootNode = document.getElementById(ROOT_NODE_ID);

const fetchData = url =>
  fetch(url)
    .then(jsonData => jsonData.json())
    .then(getRootRms)
    .then(render);

const createElement = (nodeType, options = {}, ...children) => {
  const element = Object.assign(document.createElement(nodeType), options);
  element.append(...children);
  return element;
};

const createPool = (poolName, children) =>
  createElement(TAG_FOR_POOL, { className: CLASS_POOL }, `Pool: ${poolName}`, ...children);

class Employee {
  constructor({ id, name, salary, performance, rm_id, last_vacation_date }) {
    this.id = id;
    this.name = name;
    this.salary = salary;
    this.performance = performance;
    this.rm_id = rm_id;
    this.last_vacation_date = last_vacation_date;
  }
  getName = () => this.name;
  getSalary = () => this.salary;
  getPerformance = () => this.performance;
  getLastVacationDate = () => this.last_vacation_date;
  getRmId = () => this.rm_id;
  getEmployeeStatus = () => STATUS_EMPLOYEE;
  followStrategy = () => typeof Employee.strategy === 'function' ? Employee.strategy(this) : this;
  static setStrategy(strategy) {
    Employee.strategy = strategy;
  }
}

class Developer extends Employee {
  getEmployeeStatus = () => STATUS_DEVELOPER;
}

class ResourceManager extends Employee {
  pool = [];
  constructor({ pool_name, ...restData }) {
    super(restData);
    this.pool_name = pool_name;
    this.pool = [];
    this.isRM = true;
  }
  get hasPool() {
    return Array.isArray(this.pool) && this.pool.length;
  }
  addEmployee = employee => this.pool.push(employee);
  getPoolName = () => this.pool_name;
  getPoolLength = () => this.pool.reduce(
    (total, employee) => total + (employee instanceof ResourceManager ? employee.getPoolLength() : 1),
    1
  );
  getEmployeeStatus = () => STATUS_RM;
}

function getRootRms(data) {
  const idToIndex = {};
  return data
    .map((employee, index) => {
      idToIndex[employee.id] = index;
      return 'pool_name' in employee ? new ResourceManager(employee) : new Developer(employee);
    })
    .reduce(
      (rootRms, employee, _, employeeArray) => {
        if (employee.rm_id) {
          employeeArray[idToIndex[employee.rm_id]].addEmployee(employee);
        } else {
          rootRms.push(employee);
        }
        return rootRms;
      },
      []
    );
}

function selectAllEmployeesStrategy(employee) {
  const node = createElement(TAG_FOR_ITEM, { className: employee.getEmployeeStatus() }, employee.getName());
  if (employee.hasPool) {
    node.append(createPool(employee.getPoolName(), applyStrategyToPool(employee)));
  }
  return node;
}

function renderAllEmployeeStrategy(topStaff, nodeOptions, parentNode, tagType = TAG_FOR_TAB) {
  Employee.setStrategy(selectAllEmployeesStrategy);
  parentNode.append(
    createElement(
      tagType,
      nodeOptions,
      createElement('h2', { TITLE_LINE_STYLES }, 'All employees list'),
      ...topStaff.map(topRm => createPool(GLOBAL_POOL_NAME, [topRm.followStrategy()])
      )
    )
  );
}

function applyStrategyToPool(resourceManager) {
  return resourceManager.hasPool && resourceManager.pool.map(dev => dev.followStrategy());
}

function selectRmOnlyStrategy(employee) {
  return employee.isRM
    ? [employee, applyStrategyToPool(employee)]
    : null;
}
function getList(topStaff, strategy) {
  Employee.setStrategy(strategy);
  return topStaff.map(topRm => topRm.followStrategy()).flat(Infinity).filter(rm => rm);
}

function renderUnitStrategy(topStaff, nodeOptions, parentNode, tagType = TAG_FOR_TAB) {
  const rmArray = getList(topStaff, selectRmOnlyStrategy);
  Employee.setStrategy(totalSalaryForDirectPoolMembersStrategy);
  parentNode.append(
    createElement(
      tagType,
      nodeOptions,
      createElement(
        TAG_FOR_POOL,
        {},
        createElement('h2', { TITLE_LINE_STYLES }, 'Average salary for pools (only directly subordinate)'),
        ...rmArray.map(rm =>
          createElement(
            TAG_FOR_ITEM,
            { className: CLASS_AVERAGE },
            `"${rm.getPoolName()}": $${(rm.followStrategy() / (rm.pool.length + 1)).toFixed(2)}`
          )
        )
      )
    )
  );
}

function totalSalaryForDirectPoolMembersStrategy(employee) {
  const ownSalary = employee.getSalary();
  return employee.hasPool
    ? employee.pool.reduce((totalSalary, dev) => totalSalary + dev.getSalary(), ownSalary)
    : ownSalary;
}

function selectEveryBodyStrategy(employee) {
  return employee.isRM ? [employee, applyStrategyToPool(employee)] : employee;
}
function warningsStrategy(employee) {
  return employee.getSalary()
}

function renderWarningStrategy(topStaff, nodeOptions, parentNode, performance, tagType = TAG_FOR_TAB) {
  const rmArray = getList(topStaff, selectRmOnlyStrategy);
  Employee.setStrategy(totalSalaryForDirectPoolMembersStrategy);
  const averageSalaryMap = new Map(rmArray.map(rm => [rm.id, rm.followStrategy() / (rm.pool.length + 1)]));
  const selectedEmployees = getList(topStaff, selectEveryBodyStrategy)
    .filter(dev => dev.getPerformance() === performance && dev.getSalary() > averageSalaryMap.get(dev.getRmId()));
  parentNode.append(
    createElement(
      tagType,
      nodeOptions,
      createElement(
        TAG_FOR_POOL,
        {},
        createElement('h2', { TITLE_LINE_STYLES }, `Warning list: has ${performance} performance`),
        ...selectedEmployees.map(dev =>
          createElement(
            TAG_FOR_ITEM,
            { className: CLASS_WARNING },
            `${dev.getName()} with a salary $${dev.getSalary()} ` +
            `(average in poll $${averageSalaryMap.get(dev.getRmId()).toFixed(2)})`
          )
        )
      )
    )
  );
}

function render(topStaff) {
  renderAllEmployeeStrategy(topStaff, { className: 'tab full-list' }, rootNode);
  renderUnitStrategy(topStaff, { className: 'tab units-list' }, rootNode);
  renderWarningStrategy(topStaff, { className: 'tab warning-list' }, rootNode, LOW_PERFORMANCE);
  renderWarningStrategy(topStaff, { className: 'tab warning-list' }, rootNode, TOP_PERFORMANCE);
}

fetchData(DATA_URL);
