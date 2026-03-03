const { PrismaClient } = require('@prisma/client');

async function main() {
    const prisma = new PrismaClient();
    try{
         const allFactors=await prisma.emissionFactor.findMany(); 
         console.log(allFactors);
    } catch (e){ console.log(e); }
    finally{ await prisma.$disconnect(); }
}
main();
