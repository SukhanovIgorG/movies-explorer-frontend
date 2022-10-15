import loader from "../../image/loading.gif";

function Preloader ( {onLoading, message} ) {
  return (
    <div className='preloader'>
      <div className='preloader__container'>
        {onLoading ? <img className="preloader__load-image" src={loader} alt='loading...'></img> : <span className='preloader__message'>{message}</span> }
      </div>
    </div>
  )
}

export default Preloader
