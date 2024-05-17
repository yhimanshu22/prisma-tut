import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


async function main() {
    //creating a user-------->

    // const userCreate = await prisma.user.create({ data: { name: 'himu', username: 'fhb', email: 'sddc@gmail.com' } })
    //console.log(userCreate);

    //find all user------>

    const findAllUsers = await prisma.user.findMany()
    console.log(findAllUsers);

    //retrive a single record 

    const newUser = await prisma.user.create({
        data: {
            name: 'John Doe',
            username: 'johndoe',
            email: 'johndoe@example.com',
            isAdmin: false,
            preferences: { theme: 'dark' },
        },
    });
    console.log(newUser);

    //update a record->
    const updatedUser = await prisma.user.update({
        where: { id: 134 },
        data: { email: 'hium@gmail.com' },

    })

    //delete a user-------->
    const deletedUser = await prisma.user.delete({
        where: { id: 123 },
    })

    //create a new record or update an existing record-------->
    const upsertedUser = await prisma.user.upsert({
        where: { email: 'humf' },
        update: { name: 'sdf' },
        create: {
            name: 'sdf',
            username: 'wer',
            email: 'werdfg',
            isAdmin: false,
            preferences: { theme: 'dark' },
        }
    })

    //retrieve the first record ------>
    const firtUser = await prisma.user.findFirst({
        where: { isAdmin: true },
    })

    //delete multiple records -------->
    const deletedUsers = await prisma.user.deleteMany({
        where: { isAdmin: false },
    })

    //update multiple records------->

    const updatedUsers = await prisma.user.updateMany({
        where: { isAdmin: false },
        data: { isAdmin: true },
    })

    //count the number of records that match a filter---------->
    const userCount = await prisma.user.count({
        where: { isAdmin: true },
    })

    //retrieve multiple record 
    const users = await prisma.user.findMany({
        where: { isAdmin: false },
        orderBy: { name: 'asc' },
    });
    console.log(users);

    //retrieve a single record or throw an error if not found--------->
    const user = await prisma.user.findUniqueOrThrow({
        where: { id: 'user-id-123' },
    });
    console.log(user);

    //perform aggregations like sum,average,min,max on a model------>
    const postAggregate = await prisma.post.aggregate({
        _avg: {
            rating: true,
        },
        _count: {
            _all: true,
        },
    });
    console.log(postAggregate);

    //group records by a specific field and perform aggregations----------->
    const groupedPosts = await prisma.post.groupBy({
        by: ['authorId'],
        _count: {
            _all: true,
        },
        _avg: {
            rating: true,
        },
    });
    console.log(groupedPosts);

    //retrive the first record that matches or throw an error if not matches---------->
    const firstUser = await prisma.user.findFirstOrThrow({
        where: { isAdmin: true },
    });
    console.log(firstUser);

    //retrieve multiple record and include related records---------->
    const posts = await prisma.post.findMany({
        include: {
            author: true,
        },
    });
    console.log(posts);

    //craete multiple records in a model-------->
    const newUsers = await prisma.user.createMany({
        data: [
            {
                name: 'Alice',
                username: 'alice',
                email: 'alice@example.com',
                isAdmin: false,
                preferences: { theme: 'light' },
            },
            {
                name: 'Bob',
                username: 'bob',
                email: 'bob@example.com',
                isAdmin: true,
                preferences: { theme: 'dark' },
            },
        ],
    });
    console.log(newUsers);

    //upadte a record and its related records in one operation-------------->
    const updatedPost = await prisma.post.update({
        where: { id: 'post-id-123' },
        data: {
            rating: 4.5,
            author: {
                update: {
                    name: 'Updated Author Name',
                },
            },
        },
    });
    console.log(updatedPost);

    //run a raw query against the database
    const rawUsers = await prisma.$queryRaw`SELECT * FROM User WHERE isAdmin = false`;
    console.log(rawUsers);

    // un a raw query that doesn't return any data (e.g., insert, update)
    const result = await prisma.$executeRaw`UPDATE User SET isAdmin = true WHERE isAdmin = false`;
    console.log(result);




}

main()
    .catch(e => {
        console.error(e.message)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })