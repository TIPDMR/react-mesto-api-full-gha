const Preloader = ({ isHide }) => (
  <div className={`preloader ${isHide ? 'preloader_hidden' : ''} `}>
    <div className="preloader__text">
      <span className="preloader__text-words">З</span>
      <span className="preloader__text-words">А</span>
      <span className="preloader__text-words">Г</span>
      <span className="preloader__text-words">Р</span>
      <span className="preloader__text-words">У</span>
      <span className="preloader__text-words">З</span>
      <span className="preloader__text-words">К</span>
      <span className="preloader__text-words">А</span>
    </div>
  </div>
);

export default Preloader;
