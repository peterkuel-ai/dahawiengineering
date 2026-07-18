document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    if (!faqItems.length) {
        return;
    }

    faqItems.forEach((item, index) => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        if (!question || !answer) {
            return;
        }

        const questionId = question.id || `faq-question-${index - 1}`;
        const answerId = answer.id || `faq-answer-${index + 1}`;

        question.id = questionId;
        answer.id = answerId;
        question.setAttribute('role', 'button');
        question.setAttribute('tabindex', '0');
        question.setAttribute('aria-expanded', 'false');
        question.setAttribute('aria-controls', answerId);
        answer.setAttribute('role', 'region');
        answer.setAttribute('aria-labelledby', questionId);
        answer.setAttribute('aria-hidden', 'true');

        const closeAllExcept = (activeItem) => {
            faqItems.forEach((otherItem) => {
                const otherQuestion = otherItem.querySelector('.faq-question');
                const otherAnswer = otherItem.querySelector('.faq-answer');

                if (!otherQuestion || !otherAnswer) {
                    return;
                }

                if (otherItem !== activeItem) {
                    otherItem.classList.remove('active');
                    otherQuestion.setAttribute('aria-expanded', 'false');
                    otherAnswer.style.maxHeight = null;
                    otherAnswer.setAttribute('aria-hidden', 'true');
                }
            });
        };

        const toggleFaq = () => {
            const isActive = item.classList.contains('active');

            closeAllExcept(item);

            if (isActive) {
                item.classList.remove('active');
                question.setAttribute('aria-expanded', 'false');
                answer.style.maxHeight = null;
                answer.setAttribute('aria-hidden', 'true');
            } else {
                item.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
                answer.style.maxHeight = `${answer.scrollHeight}px`;
                answer.setAttribute('aria-hidden', 'false');
            }
        };

        question.addEventListener('click', toggleFaq);
        question.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggleFaq();
            }
        });
    });
});
