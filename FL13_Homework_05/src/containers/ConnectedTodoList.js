import { connect } from 'react-redux';
import TodoList from '../components/TodoList';
import { openEditor, deleteItemById } from '../store/actions';

const mapStateToProps = ({ rows = [], filter, todoItemDataOrder }) => ({
  rows,
  filter,
  todoItemDataOrder,
});

const mapDispatchToProps = {
  onEditItem: openEditor,
  onDeleteItem: deleteItemById,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
