import Joi from 'joi-browser';
import Form from './common/form';
import { getMovie, saveMovie } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import { withRouter } from '../utils/withRouter';
import { Navigate } from 'react-router';
class MovieForm extends Form {
  state = {
    data: { _id: '', title: '', genreId: '', numberInStock: '', dailyRentalRate: '' },
    genres: [],
    selectedOpt: [],
    errors: {},
    navigateStatus: false
  };

  schema = {
    _id: Joi.string().allow(null, ''),
    title: Joi.string().required().label('Title'),
    numberInStock: Joi.number().integer().min(0).max(100).required().label('Stock'),
    dailyRentalRate: Joi.number().min(0).max(5).required().label('Rate'),
    genreId: Joi.string().required().label('Genre')
  };

  componentDidMount = () => {
    const genres = getGenres();
    this.setState({ genres });
    const movieId = this.props.location.pathname;
    if (movieId === '/new-movie') return;
    const data = getMovie(this.props.id);
    if (!data) {
      this.setState({ navigateStatus: true });
      return;
    }
    const selectedOpt = genres.filter((genre) => genre._id === data.genre._id);
    this.setState({ selectedOpt, data: this.mapToViewModel(data) });
  };

  mapToViewModel = (data) => {
    return {
      _id: data._id,
      title: data.title,
      genreId: data.genre._id,
      numberInStock: data.numberInStock,
      dailyRentalRate: data.dailyRentalRate
    };
  };

  doSubmit = () => {
    saveMovie(this.state.data);
    this.props.navigate('/movies');
  };

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        {this.state.navigateStatus && <Navigate to="/not-found" />}
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title')}
          {this.renderInput('numberInStock', 'Stock')}
          {this.renderInput('dailyRentalRate', 'Rate')}
          {this.renderSelect('genreId', 'Genre')}
          {this.renderButton('Save')}
        </form>
      </div>
    );
  }
}

export default withRouter(MovieForm);
