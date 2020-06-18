import styled from 'styled-components'
import PropTypes from 'prop-types'

const FlexGroup = styled.div`
  display: flex;
  padding: ${({ paddingH, paddingV }) => (paddingV !== undefined ? `${paddingV}px ${paddingH || paddingV}px` : '0px 15px')};
  padding: ${({ stretch }) => (stretch && '0px')};
  justify-content: ${({ justify }) => (justify || 'flex-start')};
  align-items: ${({ center }) => (center ? 'center' : 'flex-start')};
  flex-direction: ${({ direction }) => (direction || 'row')};
  background: ${({ background }) => (background || 'inherit')};
  border-radius: ${({ radius }) => (radius && `${radius}px`)};
  height: ${({ fullHeight, height }) => (fullHeight ? '100%' : height && `${height}px`)};
  flex-wrap: ${({ wrap }) => (wrap && 'wrap')};

  & > * {
    margin: ${({ direction, gutter }) => (direction.startsWith('row') && (gutter ? `0px ${gutter}px` : '0px 15px'))};
  };

  & > :first-child {
    margin-left: ${({ direction }) => (direction.startsWith('row') && 0)};
  };

  & > :last-child {
    margin-right: ${({ direction }) => (direction.startsWith('row') && 0)};
  };
`

FlexGroup.propTypes = {
  direction: PropTypes.string
}

FlexGroup.defaultProps = {
  direction: 'row'
}

export default FlexGroup
