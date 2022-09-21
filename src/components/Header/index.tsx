import React from 'react';

//Images
import logoImg from '@assets/logo.png';

import {
    Container,
    Logo,
    BackButton,
    BackIcon
} from './styles'

type Props = {
  showBackButton?: boolean;
}

export function Header({ showBackButton = false }:Props) {

  return (
    <Container>

      { showBackButton && 
        <BackButton>
          <BackIcon color="#fff" />
        </BackButton>
      }

        <Logo source={logoImg} />
    </Container>
  );
}