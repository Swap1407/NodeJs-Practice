import { createServer } from 'node:http';
import { parse } from 'url';

const port = 3000;
const host = '127.0.0.1';
let users = [
    { id: 1, name: 'User1', email: 'user1@example.com' },
    { id: 2, name: 'User2', email: 'user2@example.com' }
];

const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const path = parsedUrl.pathname.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();

    if (path === 'users' && method === 'get') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users));
    } else if (path === 'user' && method === 'get') {
        const user = users.find(u => u.id == 1);
        if (user) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(user));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User not found' }));
        }
    } else if (path === 'user' && method === 'post') {
        const newUser = {
            id: users.length + 1,
            name: "user3",
            email: "user3@example.com"
        };
        users.push(newUser);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newUser));
    } else if (path === 'user' && method === 'put') {
        const user = users.find(u => u.id == 1);
        if (user) {
            user.name = "editedusername1" || user.name;
            user.email = "editeduseremail1@example.com" || user.email;
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(user));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User not found' }));
        }
    } else if (path === 'user' && method === 'delete') {
        const userIndex = users.findIndex(u => u.id == 2);
        if (userIndex > -1) {
            users.splice(userIndex, 1);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User deleted successfully' }));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User not found' }));
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Not Found' }));
    }

});

server.listen(port, host, () => {
    console.log(`Server is running on http://localhost: ${port}`);
});