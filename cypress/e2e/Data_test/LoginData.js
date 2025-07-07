export const loginTestCases = [
    {
        name: 'should login successfully with valid credentials (standard user)',
        username: 'T0045',
        password: '12345678tT',
        expectedUrlPart: '/dashboards/crm',
        expectedMessage: null,
        shouldLoginPass: true
    },
    {
        name: 'should display error for invalid username',
        username: 'nonExistentUser',
        password: 'somePassword',
        expectedUrlPart: '/login', // คาดหวังว่าจะยังอยู่หน้า Login
        expectedMessage: 'OK', // ปรับตามข้อความ Error จริง
        shouldLoginPass: false
    },
    {
        name: 'should display error for invalid password',
        username: 'T0045',
        password: 'wrongPassword',
        expectedUrlPart: '/login',
        expectedMessage: 'OK',
        shouldLoginPass: false
    },
    {
        name: 'should display error for empty username',
        username: '',
        password: '12345678tT',
        expectedUrlPart: '/login',
        expectedMessage: '_required', // ปรับตามข้อความ Error จริง
        shouldLoginPass: false
    },
    {
        name: 'should display error for empty password',
        username: 'T0045',
        password: '',
        expectedUrlPart: '/login',
        expectedMessage: '_required', // ปรับตามข้อความ Error จริง
        shouldLoginPass: false
    }
];