// UI 렌더링 및 네비게이션, 아코디언, 문제 표시, 네비게이션 등 UI 렌더링
function renderAccordion() {
    const container = document.getElementById('accordionContainer');
    container.innerHTML = '';
    
    categories.forEach((category, index) => {
        const accordionItem = document.createElement('div');
        accordionItem.className = 'accordion-item';
        accordionItem.id = `accordion-${index}`;
        
        const header = document.createElement('div');
        header.className = 'accordion-header';
        header.onclick = () => toggleAccordion(index);
        
        header.innerHTML = `
            <div class="accordion-title">
                <span class="accordion-icon">${category.icon}</span>
                <span>${category.name}</span>
            </div>
            <span class="accordion-arrow">▼</span>
        `;
        
        const content = document.createElement('div');
        content.className = 'accordion-content';
        content.id = `content-${index}`;
        
        if (category.problems && category.problems.length > 0) {
            content.innerHTML = createProblemContent(index);
        } else {
            content.innerHTML = `
                <div class="empty-message">
                    <div class="empty-message-icon">📝</div>
                    <div class="empty-message-text">준비 중인 카테고리입니다</div>
                </div>
            `;
        }
        
        accordionItem.appendChild(header);
        accordionItem.appendChild(content);
        container.appendChild(accordionItem);
    });
}

function toggleAccordion(index) {
    const item = document.getElementById(`accordion-${index}`);
    const wasActive = item.classList.contains('active');
    
    document.querySelectorAll('.accordion-item').forEach(el => {
        el.classList.remove('active');
    });
    
    if (!wasActive) {
        item.classList.add('active');
        currentCategoryIndex = index;
        currentProblemIndex = 0;
        
        if (categories[index].problems && categories[index].problems.length > 0) {
            updateProblemDisplay(index);
        }
    } else {
        currentCategoryIndex = null;
    }
}

function createProblemContent(categoryIndex) {
    return `
        <div class="problem-container" id="problem-container-${categoryIndex}">
            <div class="problem-info">
                <div class="info-left">
                    <span class="badge badge-primary" id="problemNumber-${categoryIndex}">문제 1 / ${categories[categoryIndex].problems.length}</span>
                    <span class="badge badge-secondary" id="examInfo-${categoryIndex}">시험</span>
                    <span class="badge badge-category" id="categoryBadge-${categoryIndex}" style="display: none;"></span>
                </div>
                <span class="badge badge-success">${categories[categoryIndex].name}</span>
            </div>

            <div class="problem-grid" id="problemGrid-${categoryIndex}"></div>

            <div class="problem-box">
                <h3>문제</h3>
                <p id="questionText-${categoryIndex}" class="question-text"></p>
            </div>

            <div class="answer-input-box">
                <label for="userAnswer-${categoryIndex}">답안 입력</label>
                <textarea 
                    id="userAnswer-${categoryIndex}" 
                    placeholder="답을 입력하세요..."
                    rows="3"
                ></textarea>
            </div>

            <div class="selector-box" id="difficultySelector-${categoryIndex}" style="display: none;">
                <label for="difficulty-${categoryIndex}">난이도 선택:</label>
                <select id="difficulty-${categoryIndex}" class="selector-dropdown">
                    <option value="1">📊 간단 (레벨 1)</option>
                    <option value="2">🔥 복잡 (레벨 2)</option>
                </select>
            </div>

            <div class="selector-box" id="categorySelector-${categoryIndex}" style="display: none;">
                <label for="cCategory-${categoryIndex}">문제 유형 선택:</label>
                <select id="cCategory-${categoryIndex}" class="selector-dropdown">
                    <optgroup label="📊 정렬 알고리즘">
                        <option value="selectionSort">선택정렬</option>
                        <option value="bubbleSort">버블정렬</option>
                        <option value="insertionSort">삽입정렬</option>
                    </optgroup>
                    <optgroup label="⚙️ 연산">
                        <option value="logicalOp">논리연산</option>
                        <option value="bitOp">비트연산</option>
                    </optgroup>
                    <optgroup label="🔀 조건문">
                        <option value="ifStmt">if문</option>
                        <option value="switchStmt">switch문</option>
                    </optgroup>
                    <optgroup label="🔁 반복문">
                        <option value="forLoop">for문</option>
                        <option value="whileLoop">while문</option>
                        <option value="doWhile">do-while문</option>
                        <option value="breakContinue">break/continue</option>
                        <option value="nestedLoop">다중for문</option>
                    </optgroup>
                    <optgroup label="📦 배열 & 포인터">
                        <option value="array">배열</option>
                        <option value="pointer">포인터</option>
                        <option value="arrayPointer">배열과포인터</option>
                        <option value="array2d">2차원배열</option>
                        <option value="pointerArray">포인터배열</option>
                    </optgroup>
                    <optgroup label="🏗️ 구조체">
                        <option value="struct">구조체</option>
                        <option value="arrayPointerStruct">배열포인터</option>
                    </optgroup>
                    <optgroup label="📞 함수">
                        <option value="function">기본함수</option>
                        <option value="functionLoop">함수와반복문</option>
                        <option value="functionAddress">함수에주소전달</option>
                        <option value="functionScope">함수와변수유효범위</option>
                        <option value="functionReturnAddress">함수가주소리턴</option>
                        <option value="staticVar">static변수</option>
                        <option value="recursion">재귀함수</option>
                        <option value="multiRecursion">중복재귀함수</option>
                    </optgroup>
                    <optgroup label="📌 기타">
                        <option value="printfOrder">printf출력순서</option>
                    </optgroup>
                </select>
            </div>
            <div class="selector-box" id="algorithmSelector-${categoryIndex}" style="display: none;">
                <label for="pageAlgorithm-${categoryIndex}">알고리즘 선택:</label>
                <select id="pageAlgorithm-${categoryIndex}" class="selector-dropdown">
                    <option value="FIFO">📥 FIFO (First In First Out)</option>
                    <option value="LRU">🕒 LRU (Least Recently Used)</option>
                    <option value="LFU">📊 LFU (Least Frequently Used)</option>
                </select>
            </div>            
            <button onclick="generateRandomProblem(${categoryIndex})" class="btn btn-random">
                🎲 새 문제 만들기
            </button>

            <button onclick="toggleAnswer(${categoryIndex})" class="btn btn-answer" id="toggleAnswerBtn-${categoryIndex}">
                정답 확인
            </button>

            <div id="answerBox-${categoryIndex}" class="answer-box hidden">
                <h3>정답</h3>
                <p id="answerText-${categoryIndex}" class="answer-text"></p>
            </div>

            <div class="navigation">
                <button onclick="prevProblem(${categoryIndex})" class="btn btn-nav" id="prevBtn-${categoryIndex}">이전 문제</button>
                <button onclick="nextProblem(${categoryIndex})" class="btn btn-nav btn-primary" id="nextBtn-${categoryIndex}">다음 문제</button>
            </div>
        </div>
    `;
}

function updateProblemDisplay(categoryIndex) {
    const category = categories[categoryIndex];
    const problem = category.problems[currentProblemIndex];
    
    const problemNumberText = problem.exam === '랜덤 생성'
    ? `랜덤문제 / ${category.problems.length}` 
    : `문제 ${currentProblemIndex + 1} / ${category.problems.length}`;
document.getElementById(`problemNumber-${categoryIndex}`).textContent = problemNumberText;
    
    const categoryBadge = document.getElementById(`categoryBadge-${categoryIndex}`);
    if (categoryBadge && problem.category) {
        categoryBadge.textContent = problem.category;
        categoryBadge.style.display = 'inline-block';
    } else if (categoryBadge) {
        categoryBadge.style.display = 'none';
    }
    
    const questionElement = document.getElementById(`questionText-${categoryIndex}`);
    questionElement.textContent = problem.question.replace(/\\n/g, '\n');

    if (category.id === 'python' && (problem.question.includes('def ') || problem.question.includes('print(') || problem.question.includes('for ') || problem.question.includes('='))) {
        questionElement.classList.add('has-python-code');
    } else if (category.id === 'java' && (problem.question.includes('public class') || problem.question.includes('class ') || problem.question.includes('System.out'))) {
        questionElement.classList.add('has-java-code');
        questionElement.classList.remove('has-python-code');
        questionElement.classList.remove('has-c-code');
    } else if (category.id === 'c' && (problem.question.includes('#include') || problem.question.includes('int main()') || problem.question.includes('printf('))) {
        questionElement.classList.add('has-c-code');
        questionElement.classList.remove('has-python-code');
        questionElement.classList.remove('has-java-code');
    }
    
    document.getElementById(`answerText-${categoryIndex}`).textContent = problem.answer;
    document.getElementById(`userAnswer-${categoryIndex}`).value = '';
    
    hideAnswerBox(categoryIndex);
    updateNavigationButtons(categoryIndex);
    createProblemGrid(categoryIndex);
    
    const difficultySelector = document.getElementById(`difficultySelector-${categoryIndex}`);
    if (difficultySelector) {
        if (category.id === 'python') {
            difficultySelector.style.display = 'block';
        } else {
            difficultySelector.style.display = 'none';
        }
    }
    
    const categorySelector = document.getElementById(`categorySelector-${categoryIndex}`);
    if (categorySelector) {
        if (category.id === 'c' && currentProblemIndex === 28) {
            categorySelector.style.display = 'block';
        } else {
            categorySelector.style.display = 'none';
        }
    }
    
    const algorithmSelector = document.getElementById(`algorithmSelector-${categoryIndex}`);
    if (algorithmSelector) {
        if (category.id === 'page' && currentProblemIndex === 3) {
            algorithmSelector.style.display = 'block';
        } else {
            algorithmSelector.style.display = 'none';
        }
    }
    
    const answerInputBox = document.querySelector(`#problem-container-${categoryIndex} .answer-input-box`);
    
    if (category.id === 'page' && currentProblemIndex === 3 && problem.pages) {
        answerInputBox.innerHTML = createPageAnswerForm(categoryIndex, problem);
    } else {
        answerInputBox.innerHTML = `
            <label for="userAnswer-${categoryIndex}">답안 입력</label>
            <textarea 
                id="userAnswer-${categoryIndex}" 
                placeholder="답을 입력하세요..."
                rows="3"
            ></textarea>
        `;
    }
}

function createProblemGrid(categoryIndex) {
    const grid = document.getElementById(`problemGrid-${categoryIndex}`);
    const category = categories[categoryIndex];
    
    grid.innerHTML = '';
    
    category.problems.forEach((problem, index) => {
        const btn = document.createElement('button');
        btn.className = 'problem-number-btn';
        if (index === currentProblemIndex) {
            btn.classList.add('active');
        }
        // exam이 "랜덤 생성"이면 "랜덤"으로 표시, 아니면 번호 표시
        btn.textContent = problem.exam === '랜덤 생성' ? '랜덤' : index + 1;
        btn.onclick = () => goToProblem(categoryIndex, index);
        grid.appendChild(btn);
    });
}

function goToProblem(categoryIndex, problemIndex) {
    currentProblemIndex = problemIndex;
    updateProblemDisplay(categoryIndex);
}

function nextProblem(categoryIndex) {
    const category = categories[categoryIndex];
    if (currentProblemIndex < category.problems.length - 1) {
        currentProblemIndex++;
        updateProblemDisplay(categoryIndex);
    }
}

function prevProblem(categoryIndex) {
    if (currentProblemIndex > 0) {
        currentProblemIndex--;
        updateProblemDisplay(categoryIndex);
    }
}

function updateNavigationButtons(categoryIndex) {
    const category = categories[categoryIndex];
    document.getElementById(`prevBtn-${categoryIndex}`).disabled = currentProblemIndex === 0;
    document.getElementById(`nextBtn-${categoryIndex}`).disabled = currentProblemIndex === category.problems.length - 1;
}

function toggleAnswer(categoryIndex) {
    const answerBox = document.getElementById(`answerBox-${categoryIndex}`);
    const toggleBtn = document.getElementById(`toggleAnswerBtn-${categoryIndex}`);
    const answerText = document.getElementById(`answerText-${categoryIndex}`);
    const category = categories[categoryIndex];
    
    if (answerBox.classList.contains('hidden')) {
        if (category.id === 'page' && currentProblemIndex === 3) {
            answerText.innerHTML = category.problems[currentProblemIndex].answer;
        } else {
            answerText.textContent = category.problems[currentProblemIndex].answer;
        }
        
        answerBox.classList.remove('hidden');
        toggleBtn.textContent = '정답 숨기기';
    } else {
        hideAnswerBox(categoryIndex);
    }
}

function hideAnswerBox(categoryIndex) {
    const answerBox = document.getElementById(`answerBox-${categoryIndex}`);
    const toggleBtn = document.getElementById(`toggleAnswerBtn-${categoryIndex}`);
    
    answerBox.classList.add('hidden');
    toggleBtn.textContent = '정답 확인';
}

function createPageAnswerForm(categoryIndex, problem) {
    const pages = problem.pages;
    const frameCount = problem.frameCount;
    
    let html = '<label>답안 입력 (표를 채워주세요)</label>';
    html += '<div class="page-answer-form">';
    html += '<table class="page-input-table">';
    
    html += '<thead><tr>';
    html += '<th class="label-col">구분</th>';
    for (let i = 0; i < pages.length; i++) {
        html += `<th>${i + 1}</th>`;
    }
    html += '</tr></thead>';
    
    html += '<tbody>';
    
    html += '<tr class="reference-row">';
    html += '<td class="label-col">참조</td>';
    for (let page of pages) {
        html += `<td class="reference-cell">${page}</td>`;
    }
    html += '</tr>';
    
    for (let f = 0; f < frameCount; f++) {
        html += `<tr class="frame-input-row">`;
        html += `<td class="label-col">프레임${f + 1}</td>`;
        for (let i = 0; i < pages.length; i++) {
            html += `<td><input type="text" class="frame-input" data-frame="${f}" data-step="${i}" maxlength="2" /></td>`;
        }
        html += '</tr>';
    }
    
    html += '<tr class="fault-input-row">';
    html += '<td class="label-col">부재</td>';
    for (let i = 0; i < pages.length; i++) {
        html += `<td class="fault-cell">
            <label class="radio-label">
                <input type="radio" name="fault-${i}" value="O" /> O
            </label>
            <label class="radio-label">
                <input type="radio" name="fault-${i}" value="X" /> X
            </label>
        </td>`;
    }
    html += '</tr>';
    
    html += '</tbody>';
    html += '</table>';
    html += '</div>';
    
    html += `<button onclick="submitPageAnswer(${categoryIndex})" class="btn btn-submit">✅ 정답 제출</button>`;
    
    return html;
}

function formatPageReplacementAnswer(result, pages, frameCount) {
    let html = '<div class="page-algorithm-result">';
    
    html += '<table class="page-table">';
    
    html += '<thead><tr>';
    html += '<th class="label-col">구분</th>';
    for (let i = 0; i < pages.length; i++) {
        html += `<th>${i + 1}</th>`;
    }
    html += '</tr></thead>';
    
    html += '<tbody>';
    
    html += '<tr class="reference-row">';
    html += '<td class="label-col">참조</td>';
    for (let page of pages) {
        html += `<td class="reference-cell">${page}</td>`;
    }
    html += '</tr>';
    
    for (let f = 0; f < frameCount; f++) {
        html += `<tr class="frame-row">`;
        html += `<td class="label-col">프레임${f + 1}</td>`;
        for (let step of result.history) {
            const frameValue = step.frames[f];
            if (frameValue !== undefined && frameValue !== null) {
                html += `<td class="frame-cell">${frameValue}</td>`;
            } else {
                html += `<td class="empty-cell">-</td>`;
            }
        }
        html += '</tr>';
    }
    
    html += '<tr class="fault-row">';
    html += '<td class="label-col">부재</td>';
    for (let step of result.history) {
        if (step.fault) {
            html += `<td class="fault-yes">O</td>`;
        } else {
            html += `<td class="fault-no">X</td>`;
        }
    }
    html += '</tr>';
    
    html += '<tr class="out-row">';
    html += '<td class="label-col">Out</td>';
    for (let step of result.history) {
        if (step.out !== null && step.out !== undefined) {
            html += `<td class="out-cell">${step.out}</td>`;
        } else {
            html += `<td class="empty-cell">-</td>`;
        }
    }
    html += '</tr>';
    
    html += '</tbody>';
    html += '</table>';
    
    html += '<div class="result-summary">';
    html += `<div class="summary-item"><span class="summary-label">📊 페이지 부재 횟수:</span> <span class="summary-value">${result.faults}</span></div>`;
    html += `<div class="summary-item"><span class="summary-label">📦 프레임 최종 상태:</span> <span class="summary-value">[${result.finalFrames.join(', ')}]</span></div>`;
    html += '</div>';
    
    html += '</div>';
    
    return html;
}