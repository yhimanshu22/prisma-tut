import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


async function main() {
    //creating a user-------->
    // const userCreate = await prisma.user.create({ data: { name: 'himu', username: 'fhb', email: 'sddc@gmail.com' } })
    //console.log(userCreate);
    //find all user------>
    const findAllUsers = await prisma.user.findMany()
    console.log(findAllUsers);
}

main()
    .catch(e => {
        console.error(e.message)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })