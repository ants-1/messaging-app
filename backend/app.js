import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import passport from 'passport';
import session from 'express-session';
import bcrypt from 'bcrypt';
import LocalStorage from 'passport-local';
import 'dotenv/config';
import User from './models/User.js';
import userRouter from './routes/user.js';
import messageRouter from './routes/message.js';
import chatRouter from './routes/chat.js';

const app = express();
const server = createServer(app);
const PORT = process.env.PORT;

mongoose.set('strictQuery', false);
const mongoDB = process.env.DB_URL;

main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect(mongoDB);
    console.log('MongoDB connected');
}

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(
    session({
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: true,
    })
);
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

passport.use(
    new LocalStorage(async (username, password, done) => {
        try {
            const user = await User.findOne({ username: username });
            if (!user) {
                return done(null, false, { message: 'Incorrect Username'});
            }
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return done(null, false, { message: 'Incorrect Password' });
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user)
        ;
    } catch (err) {
        done(err);
    }
})

app.use('/', userRouter);
app.use('/', messageRouter);
app.use('/', chatRouter);

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
