// 메인로직, 메인 로직 (문제 생성, 정답 체크)
function generateRandomProblem(categoryIndex) {
    const category = categories[categoryIndex];
    const problem = category.problems[currentProblemIndex];
    
    // 서브넷 카테고리 분기 처리 (기존 코드 교체)
    if (category.id === 'subnet') {
        const problemType = problem.problemType;
        
        // 기존 1~3번 문제 (ID로 구분)
        if (problem.id === 1) {
            generateRandomIPAllocationProblem(categoryIndex);
        } else if (problem.id === 2) {
            generateRandomFLSMProblem(categoryIndex);
        } else if (problem.id === 3) {
            generateRandomSubnetProblem(categoryIndex);
        }
        // 신규 4~13번 문제 (problemType으로 구분)
        else if (problemType === 'subnetMaskForHosts') {
            generateSubnetMaskForHostsProblem(categoryIndex);
        } else if (problemType === 'subnetHostCount') {
            generateSubnetHostCountProblem(categoryIndex);
        } else if (problemType === 'optimalSubnetMask') {
            generateOptimalSubnetMaskProblem(categoryIndex);
        } else if (problemType === 'flsmSpecificIP') {
            generateFLSMSpecificIPProblem(categoryIndex);
        } else if (problemType === 'flsmBroadcast') {
            generateFLSMBroadcastProblem(categoryIndex);
        } else if (problemType === 'usableLastIP') {
            generateUsableLastIPProblem(categoryIndex);
        } else if (problemType === 'broadcastAddress') {
            generateBroadcastAddressProblem(categoryIndex);
        } else if (problemType === 'subnetBitsCount') {
            generateSubnetBitsCountProblem(categoryIndex);
        } else if (problemType === 'validSubnetID') {
            generateValidSubnetIDProblem(categoryIndex);
        } else if (problemType === 'differentSubnetMask') {
            generateDifferentSubnetMaskProblem(categoryIndex);
        }
    } else if (category.id === 'page') {
        // 1번: LRU 기출 문제
        if (currentProblemIndex === 0) {
            generatePageProblem1(categoryIndex);
        }
        // 2번: LRU+LFU 비교 기출 문제
        else if (currentProblemIndex === 1) {
            generatePageProblem2(categoryIndex);
        }
        // 3번: FIFO 연습 문제
        else if (currentProblemIndex === 2) {
            generatePageProblem3(categoryIndex);
        }
        // 4번: FIFO 문제 1
        else if (currentProblemIndex === 3) {
            generatePageProblem4(categoryIndex);
        }
        // 5번: FIFO 문제 2
        else if (currentProblemIndex === 4) {
            generatePageProblem5(categoryIndex);
        }
        // 6번: FIFO 문제 3
        else if (currentProblemIndex === 5) {
            generatePageProblem6(categoryIndex);
        }
        // 7번: LRU 문제 1
        else if (currentProblemIndex === 6) {
            generatePageProblem7(categoryIndex);
        }
        // 8번: LRU 문제 2
        else if (currentProblemIndex === 7) {
            generatePageProblem8(categoryIndex);
        }
        // 9번: LRU 문제 3
        else if (currentProblemIndex === 8) {
            generatePageProblem9(categoryIndex);
        }
        // 10번: LFU 문제 1
        else if (currentProblemIndex === 9) {
            generatePageProblem10(categoryIndex);
        }
        // 11번: LFU 문제 2
        else if (currentProblemIndex === 10) {
            generatePageProblem11(categoryIndex);
        }
        // 12번: 완전 랜덤 (드랍다운)
        else if (currentProblemIndex === 11) {
            const algorithmSelect = document.getElementById(`pageAlgorithm-${categoryIndex}`);
            const selectedAlgorithm = algorithmSelect ? algorithmSelect.value : 'FIFO';
            generateCategorizedPageProblem(categoryIndex, selectedAlgorithm);
        }
    } else if (category.id === 'process_schedule') {
        // 프로세스 스케줄링: 문제 번호에 따라 해당 알고리즘 문제 생성
        if (currentProblemIndex === 0) {
            // 1번 문제: 기출 (랜덤 안 됨)
        } else if (currentProblemIndex === 1) {
            // 2번 문제: SRT
            generateProcessSchedule2(categoryIndex);
        } else if (currentProblemIndex === 2) {
            // 3번 문제: FCFS 평균 대기시간
            generateProcessSchedule3(categoryIndex);
        } else if (currentProblemIndex === 3) {
            // 4번 문제: FCFS T-t
            generateProcessSchedule4(categoryIndex);
        } else if (currentProblemIndex === 4) {
            // 5번 문제: SJF 평균 실행시간 (테이블)
            generateProcessSchedule5(categoryIndex);
        } else if (currentProblemIndex === 5) {
            // 6번 문제: SJF 평균 대기시간 (텍스트)
            generateProcessSchedule6(categoryIndex);
        } else if (currentProblemIndex === 6) {
            // 7번 문제: SJF 평균 반환+대기
            generateProcessSchedule7(categoryIndex);
        } else if (currentProblemIndex === 7) {
            // 8번 문제: SJF Task
            generateProcessSchedule8(categoryIndex);
        } else if (currentProblemIndex === 8) {
            // 9번 문제: HRN
            generateProcessSchedule9(categoryIndex);
        } else if (currentProblemIndex === 9) {
            // 10번 문제: HRN
            generateProcessSchedule10(categoryIndex);
        } else if (currentProblemIndex === 10) {
            // 11번 문제: HRN
            generateProcessSchedule11(categoryIndex);
        }
        updateProblemDisplay(categoryIndex);
    } else if (category.id === 'disk_schedule') {
        if (currentProblemIndex === 0) {
            // 1번 문제: FCFS
            generateDiskSchedule1(categoryIndex);
        } else if (currentProblemIndex === 1) {
            // 2번 문제: SSTF 가장 먼저
            generateDiskSchedule2(categoryIndex);
        } else if (currentProblemIndex === 2) {
            // 3번 문제: SSTF 총 이동거리
            generateDiskSchedule3(categoryIndex);
        } else if (currentProblemIndex === 3) {
            // 4번 문제: SSTF 처리 순서
            generateDiskSchedule4(categoryIndex);
        } else if (currentProblemIndex === 4) {
            // 5번 문제: SCAN 총 이동거리
            generateDiskSchedule5(categoryIndex);
        } else if (currentProblemIndex === 5) {
            // 6번 문제: SCAN 최후 처리
            generateDiskSchedule6(categoryIndex);
        } else if (currentProblemIndex === 6) {
            // 7번 문제: SCAN 가장 먼저
            generateDiskSchedule7(categoryIndex);
        } else if (currentProblemIndex === 7) {
            // 8번 문제: C-SCAN 처리 순서
            generateDiskSchedule8(categoryIndex);
        } else if (currentProblemIndex === 8) {
            // 9번 문제: C-SCAN 총 이동거리
            generateDiskSchedule9(categoryIndex);
        } else if (currentProblemIndex === 9) {
            // 10번 문제: LOOK 가장 먼저
            generateDiskSchedule10(categoryIndex);
        } else if (currentProblemIndex === 10) {
            // 11번 문제: LOOK 총 이동
            generateDiskSchedule11(categoryIndex);
        } else if (currentProblemIndex === 11) {
            // 12번 문제: C-LOOK 총 이동거리
            generateDiskSchedule12(categoryIndex);
        }
        
        updateProblemDisplay(categoryIndex);
    } else if (category.id === 'base') {
        generateRandomBaseConversionProblem(categoryIndex);
    } else if (category.id === 'python') {
        const difficultySelect = document.getElementById(`difficulty-${categoryIndex}`);
        const difficulty = difficultySelect ? parseInt(difficultySelect.value) : 1;
        generateRandomPythonProblem(categoryIndex, difficulty);
    } else if (category.id === 'java') { 
        generateRandomJavaProblem(categoryIndex);
    } else if (category.id === 'c') {
        if (currentProblemIndex === 28) {
            const categorySelect = document.getElementById(`cCategory-${categoryIndex}`);
            const selectedCategory = categorySelect ? categorySelect.value : 'forLoop';
            generateCategorizedCProblem(categoryIndex, selectedCategory);
        } else {
            generateRandomCProblem(categoryIndex);
        }
    }
    
    updateProblemDisplay(categoryIndex);
}

function generateRandomSubnetProblem(categoryIndex) {
    const octets = [
        Math.floor(Math.random() * 256),
        Math.floor(Math.random() * 256),
        Math.floor(Math.random() * 256),
        Math.floor(Math.random() * 256)
    ];
    
    const subnetMasks = [128, 192, 224, 240, 248, 252];
    const subnetMask = subnetMasks[Math.floor(Math.random() * subnetMasks.length)];
    
    const ipAddress = `${octets[0]}.${octets[1]}.${octets[2]}.${octets[3]}`;
    const maskString = `255.255.255.${subnetMask}`;
    
    const networkAddress = octets[3] & subnetMask;
    const hostBits = Math.log2(256 - subnetMask);
    const totalHosts = Math.pow(2, hostBits) - 2;
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `IP 주소가 ${ipAddress}이고 서브넷마스크 ${maskString}일 때 아래의 답을 작성하시오.\n(1) 괄호안에 들어갈 네트워크 주소 : ${octets[0]}.${octets[1]}.${octets[2]}.( )\n(2) 해당 네트워크 주소와 브로드캐스트 주소를 제외한 호스트 개수`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = 
        `(1) ${networkAddress}\n(2) ${totalHosts}`;
}

function generateRandomFLSMProblem(categoryIndex) {
    const octets = [
        192,
        168,
        Math.floor(Math.random() * 256),
        0
    ];
    
    const cidrs = [20, 22, 24];
    const cidr = cidrs[Math.floor(Math.random() * cidrs.length)];
    
    const divisions = [2, 4, 8];
    const divisionCount = divisions[Math.floor(Math.random() * divisions.length)];
    
    const whichNetwork = Math.floor(Math.random() * divisionCount) + 1;
    
    const newCidr = cidr + Math.log2(divisionCount);
    const hostBits = 32 - newCidr;
    const subnetSize = Math.pow(2, hostBits);
    
    const networkBase = `${octets[0]}.${octets[1]}.${octets[2]}.${octets[3]}`;
    
    let broadcastIP;
    if (cidr === 24) {
        const broadcastLastOctet = (whichNetwork * subnetSize) - 1;
        broadcastIP = `${octets[0]}.${octets[1]}.${octets[2]}.${broadcastLastOctet}`;
    } else if (cidr === 22) {
        const totalBroadcast = (whichNetwork * subnetSize) - 1;
        const thirdOctet = Math.floor(totalBroadcast / 256);
        const fourthOctet = totalBroadcast % 256;
        broadcastIP = `${octets[0]}.${octets[1]}.${thirdOctet}.${fourthOctet}`;
    } else {
        const totalBroadcast = (whichNetwork * subnetSize) - 1;
        const thirdOctet = Math.floor(totalBroadcast / 256);
        const fourthOctet = totalBroadcast % 256;
        broadcastIP = `${octets[0]}.${octets[1]}.${thirdOctet}.${fourthOctet}`;
    }
    
    const networkNames = ['첫', '두', '세', '네', '다섯', '여섯', '일곱', '여덟'];
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `${networkBase}/${cidr}인 네트워크를 FLSM ${divisionCount}개로 분할하였다. ${networkNames[whichNetwork - 1]}번째 네트워크 브로드캐스트 IP를 10진수로 변환한 값을 작성하시오.`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = broadcastIP;
}

function generateRandomIPAllocationProblem(categoryIndex) {
    const baseOctet1 = 192;
    const baseOctet2 = 168;
    const baseOctet3 = Math.floor(Math.random() * 50) + 1;
    
    const ip1 = `${baseOctet1}.${baseOctet2}.${baseOctet3}.${Math.floor(Math.random() * 200) + 1}/24`;
    const ip3 = `${baseOctet1 - Math.floor(Math.random() * 60)}.${200 + Math.floor(Math.random() * 55)}.${Math.floor(Math.random() * 50)}.${Math.floor(Math.random() * 200) + 1}/22`;
    const ip6 = `${baseOctet1}.${baseOctet2}.${baseOctet3 + 1}.${Math.floor(Math.random() * 200) + 1}/24`;
    
    const choice1 = `${baseOctet1}.${baseOctet2}.${baseOctet3}.0`;
    const choice2 = `${baseOctet1}.${baseOctet2}.${baseOctet3}.${Math.floor(Math.random() * 200) + 50}`;
    const choice3 = `${baseOctet1}.${baseOctet2}.${baseOctet3 + 1}.0`;
    const choice4 = `${baseOctet1}.${baseOctet2}.${baseOctet3 + 1}.${Math.floor(Math.random() * 200) + 200}`;
    
    const ip3Parts = ip3.split('.');
    const ip3Base = `${ip3Parts[0]}.${ip3Parts[1]}.${parseInt(ip3Parts[2]) & 0xFC}.0`;
    const choice5 = ip3Base;
    const choice6 = `${ip3Parts[0]}.${ip3Parts[1]}.${(parseInt(ip3Parts[2]) & 0xFC) + 3}.${Math.floor(Math.random() * 200) + 200}`;
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `네트워크에서 라우터를 통한 할당 가능한 2번, 4번, 5번의 IP를 작성하시오.\n1) ${ip1}\n3) ${ip3}\n6) ${ip6}\n\n보기\n${choice1}, ${choice2}, ${choice3}, ${choice4}, ${choice5}, ${choice6}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = 
        `2) ${choice2}\n4) ${choice4}\n5) ${choice6}`;
}

function generateRandomPageReplacementProblem(categoryIndex) {
    const algorithms = ['FIFO', 'LRU', 'LFU'];
    const algorithm = algorithms[Math.floor(Math.random() * algorithms.length)];
    
    const frameCount = 3 + Math.floor(Math.random() * 2);
    
    const pageCount = 12 + Math.floor(Math.random() * 9);
    const pages = [];
    for (let i = 0; i < pageCount; i++) {
        pages.push(Math.floor(Math.random() * 10));
    }
    
    const pageString = pages.join(' ');
    
    let faults = 0;
    if (algorithm === 'FIFO') {
        faults = simulateFIFO(pages, frameCount);
    } else if (algorithm === 'LRU') {
        faults = simulateLRU(pages, frameCount);
    } else if (algorithm === 'LFU') {
        faults = simulateLFU(pages, frameCount);
    }
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `${algorithm} 페이지 교체 알고리즘에 따른 페이지 부재 횟수를 작성하시오. (프레임 ${frameCount}개)\n\n페이지 참조 순서: ${pageString}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = `${faults}`;
}

function generateCategorizedPageProblem(categoryIndex, algorithm) {
    const frameCount = 3 + Math.floor(Math.random() * 2);
    
    const pageCount = 12 + Math.floor(Math.random() * 9);
    const pages = [];
    for (let i = 0; i < pageCount; i++) {
        pages.push(Math.floor(Math.random() * 10));
    }
    
    const pageString = pages.join(' ');
    
    let result;
    
    if (algorithm === 'FIFO') {
        result = simulateFIFODetailed(pages, frameCount);
    } else if (algorithm === 'LRU') {
        result = simulateLRUDetailed(pages, frameCount);
    } else if (algorithm === 'LFU') {
        result = simulateLFUDetailed(pages, frameCount);
    }
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `${algorithm} 페이지 교체 알고리즘에 따른 페이지 부재 횟수와 프레임 최종 상태를 작성하시오. (프레임 ${frameCount}개)\n\n페이지 참조 순서: ${pageString}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = 
        formatPageReplacementAnswer(result, pages, frameCount);
    
    categories[categoryIndex].problems[currentProblemIndex].correctAnswer = result;
    categories[categoryIndex].problems[currentProblemIndex].pages = pages;
    categories[categoryIndex].problems[currentProblemIndex].frameCount = frameCount;
}

function submitPageAnswer(categoryIndex) {
    const category = categories[categoryIndex];
    const problem = category.problems[currentProblemIndex];
    const correctAnswer = problem.correctAnswer;
    const pages = problem.pages;
    const frameCount = problem.frameCount;
    
    let isAllCorrect = true;
    let wrongCount = 0;
    
    for (let f = 0; f < frameCount; f++) {
        for (let i = 0; i < pages.length; i++) {
            const input = document.querySelector(`input.frame-input[data-frame="${f}"][data-step="${i}"]`);
            const userValue = input.value.trim();
            const correctValue = correctAnswer.history[i].frames[f];
            const correctStr = (correctValue !== undefined && correctValue !== null) ? correctValue.toString() : '';
            
            const cell = input.parentElement;
            
            if (userValue === correctStr || (userValue === '' && correctStr === '') || (userValue === '-' && correctStr === '')) {
                cell.classList.remove('wrong-answer');
                cell.classList.add('correct-answer');
            } else {
                cell.classList.remove('correct-answer');
                cell.classList.add('wrong-answer');
                isAllCorrect = false;
                wrongCount++;
            }
        }
    }
    
    for (let i = 0; i < pages.length; i++) {
        const selectedRadio = document.querySelector(`input[name="fault-${i}"]:checked`);
        const userFault = selectedRadio ? selectedRadio.value : null;
        const correctFault = correctAnswer.history[i].fault ? 'O' : 'X';
        
        const cell = selectedRadio ? selectedRadio.closest('td') : document.querySelector(`input[name="fault-${i}"]`).closest('td');
        
        if (userFault === correctFault) {
            cell.classList.remove('wrong-answer');
            cell.classList.add('correct-answer');
        } else {
            cell.classList.remove('correct-answer');
            cell.classList.add('wrong-answer');
            isAllCorrect = false;
            wrongCount++;
        }
    }
    
    if (isAllCorrect) {
        alert('🎉 정답입니다! 모든 칸이 정확합니다!');
    } else {
        alert(`❌ 틀렸습니다. ${wrongCount}개의 오답이 있습니다.\n틀린 부분은 빨간색으로 표시되었습니다.`);
    }
}

function generateRandomSchedulingProblem(categoryIndex) {
    const algorithms = ['FCFS', 'SJF', 'RR'];
    const algorithm = algorithms[Math.floor(Math.random() * algorithms.length)];
    
    const processCount = 3 + Math.floor(Math.random() * 3);
    const processes = [];
    
    for (let i = 0; i < processCount; i++) {
        processes.push({
            name: `P${i + 1}`,
            arrival: i === 0 ? 0 : Math.floor(Math.random() * 5),
            burst: 2 + Math.floor(Math.random() * 7)
        });
    }
    
    processes.sort((a, b) => a.arrival - b.arrival);
    
    let avgWaitTime = 0;
    let quantum = 0;
    
    if (algorithm === 'FCFS') {
        avgWaitTime = simulateFCFS(processes);
    } else if (algorithm === 'SJF') {
        avgWaitTime = simulateSJF(processes);
    } else if (algorithm === 'RR') {
        quantum = 2 + Math.floor(Math.random() * 2);
        avgWaitTime = simulateRR(processes, quantum);
    }
    
    let questionTable = '\n프로세스 | 도착시간 | 실행시간\n--------|---------|--------\n';
    processes.forEach(p => {
        questionTable += `${p.name}      | ${p.arrival}       | ${p.burst}\n`;
    });
    
    let questionText = `${algorithm} 스케줄링의 평균 대기시간을 계산하시오.${questionTable}`;
    
    if (algorithm === 'RR') {
        questionText = `RR(Round Robin) 스케줄링의 평균 대기시간을 계산하시오. (타임 슬라이스 = ${quantum})${questionTable}`;
    }
    
    categories[categoryIndex].problems[currentProblemIndex].question = questionText;
    categories[categoryIndex].problems[currentProblemIndex].answer = avgWaitTime.toFixed(2);
}

function generateRandomBaseConversionProblem(categoryIndex) {
    const conversionTypes = [
        { from: 10, to: 2, name: '10진수 → 2진수' },
        { from: 10, to: 8, name: '10진수 → 8진수' },
        { from: 10, to: 16, name: '10진수 → 16진수' },
        { from: 2, to: 10, name: '2진수 → 10진수' },
        { from: 8, to: 10, name: '8진수 → 10진수' },
        { from: 16, to: 10, name: '16진수 → 10진수' },
        { from: 2, to: 16, name: '2진수 → 16진수' }
    ];
    
    const type = conversionTypes[Math.floor(Math.random() * conversionTypes.length)];
    
    let decimalValue, sourceValue, targetValue;
    
    if (type.from === 10) {
        decimalValue = 1 + Math.floor(Math.random() * 255);
        sourceValue = decimalValue.toString(10);
        targetValue = decimalValue.toString(type.to).toUpperCase();
    } else if (type.to === 10) {
        decimalValue = 1 + Math.floor(Math.random() * 255);
        sourceValue = decimalValue.toString(type.from).toUpperCase();
        targetValue = decimalValue.toString(10);
    } else {
        decimalValue = 1 + Math.floor(Math.random() * 255);
        sourceValue = decimalValue.toString(type.from).toUpperCase();
        targetValue = decimalValue.toString(type.to).toUpperCase();
    }
    
    const baseNames = {
        2: '2진수',
        8: '8진수',
        10: '10진수',
        16: '16진수'
    };
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `다음 ${baseNames[type.from]}를 ${baseNames[type.to]}로 변환하시오.\n\n${sourceValue}(${type.from}) = ( )(${type.to})`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = targetValue;
}