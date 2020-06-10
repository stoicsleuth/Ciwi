import styled from 'styled-components'

const FlexGroup = styled.div`
  display: flex;
  padding: 0px 15px;
  justify-content: ${({ justify }) => (justify || 'flex-start')};
  align-items: ${({ center }) => (center ? 'center' : 'flex-start')};

  & > * {
    margin: ${({ gutter }) => (gutter ? `0px ${gutter}px` : '0px 15px')};
  }

`

export default FlexGroup
