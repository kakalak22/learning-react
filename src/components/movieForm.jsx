import Joi from 'joi-browser';
import Form from './common/form';
import { toast } from 'react-toastify';
import { getMovie, saveMovie } from '../services/movieService';
import { getGenres } from '../services/genreService';
import { withRouter } from '../utils/withRouter';
import { Navigate } from 'react-router';
class MovieForm extends Form {
  state = {
    data: { title: '', genreId: '', numberInStock: '', dailyRentalRate: '' },
    genres: [],
    selectedOpt: [],
    errors: {},
    navigateStatus: false
  };

  schema = {
    title: Joi.string().required().label('Title'),
    numberInStock: Joi.number().integer().min(0).max(100).required().label('Stock'),
    dailyRentalRate: Joi.number().min(0).max(5).required().label('Rate'),
    genreId: Joi.string().required().label('Genre')
  };

  populateGenres = async () => {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  };

  populateMovies = async () => {
    const movieId = this.props.location.pathname;
    if (movieId === '/new-movie') return;
    try {
      const { data } = await getMovie(this.props.id);
      const selectedOpt = this.state.genres.filter((genre) => genre._id === data.genre._id);
      this.setState({ selectedOpt, data: this.mapToViewModel(data) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        this.setState({ navigateStatus: true });
      }
    }
  };

  componentDidMount = async () => {
    await this.populateGenres();
    await this.populateMovies();
  };

  mapToViewModel = (data) => {
    return {
      title: data.title,
      genreId: data.genre._id,
      numberInStock: data.numberInStock,
      dailyRentalRate: data.dailyRentalRate
    };
  };

  doSubmit = async () => {
    const { data } = this.state;
    const id = this.props.param.id;
    try {
      await saveMovie(id, data);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) toast('Not found');
    } finally {
      toast.success('Executed');
    }
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
