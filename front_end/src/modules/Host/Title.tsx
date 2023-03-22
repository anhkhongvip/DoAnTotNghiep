import React from 'react';
import styled from 'styled-components';
const TitleStyles = styled.div`

`;
const Title = () => {
    return (
        <TitleStyles>
            <h2 className="title">Bây giờ, hãy đặt tiêu đề cho chỗ ở thuộc danh mục nhà của bạn</h2>
            <p className="description">Tiêu đề ngắn cho hiệu quả tốt nhất. Đừng lo lắng, bạn luôn có thể thay đổi tiêu đề sau.</p>
        </TitleStyles>
    );
};

export default Title;