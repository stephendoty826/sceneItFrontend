
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"

const MovieCard = ({btnDetails, movie}) => {

  const {variant, onClick, text} = btnDetails

  return (
    <>
      <div className="col-lg-4 col-md-6 pt-4 d-flex justify-content-center">
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={movie.Poster} />
          <Card.Body className="d-flex flex-column justify-content-center">
            <Card.Title>{movie.Title}</Card.Title>
            <div className="d-flex justify-content-between">
              <Button variant={variant} onClick={() => onClick(movie.imdbID)}>{text}</Button>
              <Button variant="secondary">Details</Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  )
}

export default MovieCard