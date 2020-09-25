import React from 'react';

const ReviewTile = (props) => (
    <div>
        <div>
            {props.data.summary}
        </div>
        <div>
            {props.data.body}
        </div>
    </div>
);

export default ReviewTile;
