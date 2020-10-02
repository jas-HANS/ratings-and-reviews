import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Figure from 'react-bootstrap/Figure';
import Modal from 'react-bootstrap/Modal';

import Recommend from './reviewRecommend';

const ReviewBody = ({ body, recommend, photos }) => {
  const [show, collapseText] = useState(false); // Handle the collapsing and expanding of text
  const [more, showMore] = useState(false); // Handle whether there is more to be shown or not

  const [largeText, updateLarge] = useState(''); // This is the state of the majority of the text on the body
  const [smallText, updateSmall] = useState(''); // This is the state of the minority of the text on the body

  const [hasImages, setImageState] = useState(false); // Set the state if the images exist
  const [openModal, setModal] = useState(false);
  const [currentImg, setCurrentImage] = useState('');

  useEffect(() => {
    if (body.length > 250) {
      updateLarge(body.slice(0, 250));
      updateSmall(body.slice(250));
      showMore(true);
    } else {
      updateLarge(body);
      showMore(false);
    }
  }, [body]);

  useEffect(() => {
    if (photos[0]) {
      setImageState(true);
    } else {
      setImageState(false);
    }
  }, [photos]);

  const checkIfShown = (!show ? '...' : ''); // To check if the ... is needed after the text

  return (
    <div className="review-body">
      <p className="text-body">
        {largeText}
        {more ? checkIfShown : ''}
        {show ? smallText : ''}
      </p>
      {more ? <button type="button" className="show-more-less" onClick={() => collapseText(!show)}>{show ? 'Show Less...' : 'Show More...'}</button> : ''}
      <Recommend recommend={recommend} />
      <Row>
        {hasImages ? photos.map((photo) => (
          <div key={uuidv4()} className="thumbnail-image-row">
            <Figure.Image onClick={() => { setCurrentImage(photo.url); setModal(true); }} key={photo.id} src={photo.url} width={100} height={100} style={{ padding: '5px', border: '5px solid #0F4C81', borderRadius: '10px', cursor: 'zoom-in' }} />
            <Modal show={openModal} style={{ cursor: 'zoom-out', backgroundColor: 'transparent' }} onHide={() => setModal(false)} onClick={() => setModal(false)}>
              <Figure.Image className="review-image-modal" src={currentImg} rounded />
            </Modal>
          </div>
        ))
          : <div style={{ marginLeft: '15px' }}>No Images to show...</div>}
      </Row>
    </div>
  );
};

ReviewBody.propTypes = {
  body: PropTypes.string.isRequired,
  recommend: PropTypes.number.isRequired,
  photos: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default ReviewBody;
