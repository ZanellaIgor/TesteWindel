import { Button, ButtonProps, Flex, useColorMode,Heading } from '@chakra-ui/react';
import { BsSun, BsMoonStarsFill } from 'react-icons/bs';
import React from 'react'


export function Header(){
  const { colorMode, toggleColorMode } = useColorMode();
  return (
  <Flex
  m='5px'
  justify= 'space-between'
  >
    <Heading>New Product</Heading>
    <Button
        aria-label="Toggle Color Mode"
        onClick={toggleColorMode}
        _focus={{ boxShadow: 'none' }}
        w="fit-content"
        >
        {colorMode === 'light' ? <BsMoonStarsFill /> : <BsSun />}
      </Button>
  </Flex>
);
    
}

