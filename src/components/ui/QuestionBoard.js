import React from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrowNight } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const Wrapper = styled.div`
    width: 100%;
    flex-direction: column;
`;

const Header = styled.div`
    margin-bottom: 30px;
`;

const CountText = styled.div`
    margin-top: ${props => props.marginTop || 0}px;
    margin-left: ${props => props.marginLeft || 0}px;
    margin-right: ${props => props.marginRight || 0}px;
    font-family: IBM Plex Sans;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 18px;
    letter-spacing: 0.15px;
    color: #f2f2f2;
`;

const SubjectText = styled.div`
    margin-left: ${props => props.marginLeft || 0}px;
    margin-right: ${props => props.marginRight || 0}px;
    font-family: IBM Plex Sans;
    font-style: normal;
    font-weight: bold;
    font-size: 32px;
    line-height: 42px;
    letter-spacing: 0.15px;
    background: linear-gradient(to right, #AD1DF0 0%, #FF8C25 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
    margin-bottom: 24px;
`;

const QuestionText = styled.div`
    margin-left: ${props => props.marginLeft || 0}px;
    margin-right: ${props => props.marginRight || 0}px;
    margin-bottom: 24px;
    font-weight: bold;
    font-size: 16px;
    line-height: 21px;
    letter-spacing: 0.15px;
    color: #f2f2f2;
`;

const SelectText = styled.div`
    margin-bottom: 16px;
    font-weight: normal;
    font-size: 16px;
    line-height: 21px;
    text-align: center;
    letter-spacing: 0.15px;
    color: #828282;
`;

const SyntaxHighlighterWrapper = styled.div`
    margin-left: 24px;
    margin-right: 24px;
`;

const ButtonWrapper = styled.div`
    text-align: center;
    margin-left: 24px;
    margin-right: 24px;
`;

const AnswerButton = styled.button`
    width: 90%;
    max-width: 312px;
    height: 45px;
    margin-bottom: 16px;
    border-radius: 4px;
    outline: none;
    font-family: IBM Plex Sans;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    color: #333333;
    :hover {
        background-color: #b2b2b2;
    }
    :active {
        background-color: #f2f2f2;
    }
`;

class Questionboard extends React.Component {
    constructor() {
        super();

        this.state = {
            redirect: false,
            count: 0,
            answers: [],
        };
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to={ { pathname: '/result',
                                    state: { answers: this.state.answers } } } />
        }
    }

    onButtonClick = (index) => {
        if (this.state.count < this.props.questions.length - 1) {
            this.setState({ count: this.state.count + 1 });
            this.state.answers.push(index);
        } else {
            this.state.answers.push(index);
            this.setRedirect();
        }
    }

    render() {
        const { count } = this.state;
        const { questions, language } = this.props;

        return (
            <Wrapper>
                <Header>
                    <CountText marginLeft={24} marginTop={24} marginRight={24}>
                        {`${count + 1}/${this.props.questions.length}`}
                    </CountText>
                </Header>

                <SubjectText marginLeft={24} marginRight={24}>
                    {`${questions[count].Subject}`}
                </SubjectText>

                <QuestionText marginLeft={24} marginRight={24}>
                    {`${questions[count].Question}`}
                </QuestionText>

                <SyntaxHighlighterWrapper>
                    {questions[count].Code && <SyntaxHighlighter language={language}
                                                                 style={tomorrowNight}>
                        {questions[count].Code}
                    </SyntaxHighlighter>}
                </SyntaxHighlighterWrapper>

                <SelectText>
                    {`Select an answer`}
                </SelectText>

                <ButtonWrapper>
                    {questions[count].Answers.map((answer, i) => {
                        if (answer) {
                            return (
                                <AnswerButton key={`${i}`}
                                    onClick={() => this.onButtonClick(i)}>
                                        {questions[count].Answers[i]}
                                </AnswerButton>
                            )
                        }
                    })}
                </ButtonWrapper>

                {this.renderRedirect()}
            </Wrapper>
        );
    }
}

export default Questionboard;
