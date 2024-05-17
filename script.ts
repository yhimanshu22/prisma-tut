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


}

main()
    .catch(e => {
        console.error(e.message)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })