import type { NextPage, GetServerSideProps } from 'next'
import Image from 'next/image'
import { signIn, getSession } from 'next-auth/client';
import { Flex, Heading, Stack, Button, useBreakpointValue } from '@chakra-ui/react'

import { FaDiscord } from "react-icons/fa"

import profilePic from '../public/tacobot.png'


const Home: NextPage = () => {

  const buttonSize = useBreakpointValue({lg: '25%', md: '50%', sm: '75%'})
  const sideOrStack = useBreakpointValue({lg: 'side', md: 'stack', sm:"stack", base:'stack'})
  const imgMargin = useBreakpointValue({lg: '3rem'})

  const TacoBotImg = () =>
    <div style={{marginRight: imgMargin}}>
      <Image
        src={profilePic}
        width={250}
        height={250}
        alt="Don't ask why I'm a ManDrill"
      />
    </div>

  return (
    <Flex h="100vh" justify="center" align="center">
      <Flex align="center" p="20">
        {sideOrStack === "side" && <TacoBotImg />}
        <Stack align="center" textAlign="center">
          {sideOrStack === "stack" && <TacoBotImg />}
          <Heading as="h1" size="4xl"> Hi I&apos;m TacoBot 👋</Heading>
          <Heading as="h3" size="lg"> To use my features, please authenticate with Discord below </Heading>
          <Button w={buttonSize} leftIcon={<FaDiscord />} colorScheme="teal" variant="solid" onClick={() => signIn("discord")}>
            Authenticate
          </Button>
        </Stack>
      </Flex>
    </Flex>
  )
}
//need to rebuild
export const getServerSideProps: GetServerSideProps = async (context) => { 
  const session = await getSession(context)
  if(session) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    }
  }
  return {
    props: {}
  }
}

export default Home
