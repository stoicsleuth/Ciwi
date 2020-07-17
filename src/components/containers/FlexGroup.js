import styled from 'styled-components'
import PropTypes from 'prop-types'
import breakpoints from '../../constants/breakpoints'

const FlexGroup = styled.div`
  display: flex;
  padding: ${({ paddingH, paddingV }) => (paddingV !== undefined ? `${paddingV}px ${paddingH || paddingV}px` : '0px 15px')};
  padding: ${({ stretch }) => (stretch && '0px')};
  padding-top: ${({ paddingTop }) => (paddingTop && `${paddingTop}px`)};
  justify-content: ${({ justify }) => (justify || 'flex-start')};
  align-items: ${({ center }) => (center ? 'center' : 'flex-start')};
  flex-direction: ${({ direction }) => (direction || 'row')};
  background: ${({ background }) => (background || 'inherit')};
  border-radius: ${({ radius }) => (radius && `${radius}px`)};
  height: ${({ fullHeight, height }) => (fullHeight ? '100%' : height && `${height}px`)};
  flex-wrap: ${({ wrap }) => (wrap && 'wrap')};
  max-width: ${({ maxWidth }) => (maxWidth && `${maxWidth}px`)};
  margin: ${({ maxWidth }) => (maxWidth && 'auto')};

  & > * {
    margin: ${({ direction, gutter }) => (direction.startsWith('row') && (gutter !== null ? `0px ${gutter}px` : '0px 15px'))};
  };

  & > :last-child {
    margin-right: ${({ direction }) => (direction.startsWith('row') && 0)};
  };

  & > :first-child {
    margin-left: ${({ direction }) => (direction.startsWith('row') && 0)};
  };

  @media ${breakpoints.mobileL} {
    flex-direction: ${({ series }) => (!series && 'column')};
    flex-wrap: nowrap;
    justify-content: ${({ series }) => (!series && 'center')};

    & > * {
      margin: ${({ direction, gutterXs }) => (direction.startsWith('row')
        && (gutterXs !== null ? `0px ${gutterXs}px` : '0px 15px'))};
    };
  }
`

FlexGroup.propTypes = {
  direction: PropTypes.string,
  gutter: PropTypes.number,
  gutterXs: PropTypes.number
}

FlexGroup.defaultProps = {
  direction: 'row',
  gutter: null,
  gutterXs: null
}

export default FlexGroup
