// ========================== 서브넷/네트워크 알고리즘 시작 ==========================
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
// 4번: C클래스 서브넷 마스크 계산 (호스트 수 기반)
function generateSubnetMaskForHostsProblem(categoryIndex) {
    // 필요한 서브넷 개수 (20~32개)
    const requiredSubnets = 20 + Math.floor(Math.random() * 13);
    // 필요한 호스트 개수 (4~8개)
    const requiredHosts = 4 + Math.floor(Math.random() * 5);
    
    // 호스트 비트 계산 (호스트+2를 수용할 수 있는 비트)
    const hostBits = Math.ceil(Math.log2(requiredHosts + 2));
    // 서브넷 비트 계산
    const subnetBits = Math.ceil(Math.log2(requiredSubnets));
    
    // C클래스는 8비트만 사용 가능
    if (subnetBits + hostBits > 8) {
        // 호스트 비트 우선
        const adjustedHostBits = hostBits;
        const adjustedSubnetBits = 8 - adjustedHostBits;
    }
    
    // 서브넷 마스크 계산 (마지막 옥텟)
    const maskValue = 256 - Math.pow(2, hostBits);
    const subnetMask = `255.255.255.${maskValue}`;
    
    // 선택지 생성 (정답 포함)
    const choices = [];
    choices.push(`255.255.255.${Math.max(192, maskValue - 16)}`);
    choices.push(`255.255.255.${maskValue - 8}`);
    choices.push(`255.255.255.${maskValue}`); // 정답
    choices.push(`255.255.255.${Math.min(252, maskValue + 8)}`);
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `IPv4의 C클래스 네트워크를 ${requiredSubnets}개의 서브넷으로 나누고, 각 서브넷에는 ${requiredHosts}~${requiredHosts+1}개의 호스트를 연결하려고 한다. 이러한 서브넷을 구성하기 위한 서브넷 마스크 값은?\n\n1. ${choices[0]}\n2. ${choices[1]}\n3. ${choices[2]}\n4. ${choices[3]}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = subnetMask;
}

// 5번: 서브넷 수와 호스트 수 계산
function generateSubnetHostCountProblem(categoryIndex) {
    // B클래스 기준 서브넷 마스크 선택 (/20 ~ /28)
    const prefixOptions = [20, 22, 24, 26, 28];
    const prefix = prefixOptions[Math.floor(Math.random() * prefixOptions.length)];
    
    // 서브넷 비트 (B클래스는 /16 기본)
    const subnetBits = prefix - 16;
    const subnetCount = Math.pow(2, subnetBits) - 2; // subnet-zero 제외
    
    // 호스트 비트
    const hostBits = 32 - prefix;
    const hostCount = Math.pow(2, hostBits) - 2;
    
    // 서브넷 마스크 계산
    const thirdOctet = prefix >= 24 ? 255 : (256 - Math.pow(2, 24 - prefix));
    const fourthOctet = prefix <= 24 ? 0 : (256 - Math.pow(2, 32 - prefix));
    const subnetMask = `255.255.${thirdOctet}.${fourthOctet}`;
    
    // 오답 선택지 생성
    const wrongChoices = [
        `서브넷 ${Math.floor(subnetCount / 2)}, 호스트 ${hostCount * 2}`,
        `서브넷 ${hostCount}, 호스트 ${subnetCount}`,
        `서브넷 ${subnetCount + 2}, 호스트 ${hostCount}`
    ];
    
    const correctAnswer = `서브넷 ${subnetCount}, 호스트 ${hostCount}`;
    
    // 선택지 섞기
    const allChoices = [...wrongChoices, correctAnswer];
    shuffleArray(allChoices);
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `클래스 B주소를 가지고 서브넷 마스크 ${subnetMask}으로 서브넷을 만들었을 때 나오는 서브넷의 수와 호스트의 수가 맞게 짝지어진 것은?\n\n1. ${allChoices[0]}\n2. ${allChoices[1]}\n3. ${allChoices[2]}\n4. ${allChoices[3]}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = correctAnswer;
}

// 6번: 최적 서브넷 마스크 선택 (가장 많은 호스트)
function generateOptimalSubnetMaskProblem(categoryIndex) {
    // 필요한 서브넷 개수 (4~10개)
    const requiredSubnets = 4 + Math.floor(Math.random() * 7);
    
    // 필요한 서브넷 비트 계산
    const subnetBits = Math.ceil(Math.log2(requiredSubnets));
    
    // B클래스: /16 + 서브넷 비트
    const prefix = 16 + subnetBits;
    
    // 서브넷 마스크 계산
    const thirdOctet = 256 - Math.pow(2, 24 - prefix);
    const subnetMask = `255.255.${thirdOctet}.0`;
    
    // 선택지 생성 (틀린 것들)
    const choices = [
        `255.255.${Math.max(128, thirdOctet - 64)}.0`,
        `255.255.${thirdOctet - 16}.0`,
        `255.255.${thirdOctet}.0`, // 정답
        `255.255.${Math.min(254, thirdOctet + 8)}.0`
    ];
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `B Class 네트워크에서 ${requiredSubnets}개의 서브넷이 필요할 때, 가장 많은 호스트를 사용할 수 있는 서브넷 마스크 값은?\n\n1. ${choices[0]}\n2. ${choices[1]}\n3. ${choices[2]}\n4. ${choices[3]}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = subnetMask;
}

// 7번: FLSM N번째 네트워크 M번째 사용가능 IP
function generateFLSMSpecificIPProblem(categoryIndex) {
    // 기본 네트워크 (C클래스)
    const baseIP = `192.168.${Math.floor(Math.random() * 100) + 1}.0`;
    
    // 분할 개수 (4, 8, 16개)
    const subnetOptions = [4, 8, 16];
    const subnetCount = subnetOptions[Math.floor(Math.random() * subnetOptions.length)];
    const subnetBits = Math.log2(subnetCount);
    
    // 몇 번째 네트워크? (2~subnetCount)
    const whichNetwork = 2 + Math.floor(Math.random() * (subnetCount - 1));
    
    // 몇 번째 IP? (3~6)
    const whichIP = 3 + Math.floor(Math.random() * 4);
    
    // 블록 크기 계산
    const blockSize = 256 / subnetCount;
    
    // N번째 네트워크 주소 계산 (1-based)
    const networkAddress = (whichNetwork - 1) * blockSize;
    
    // M번째 사용가능 IP (네트워크 주소 + M)
    const usableIP = networkAddress + whichIP;
    
    const answer = baseIP.replace('.0', `.${usableIP}`);
    
    // 선택지 생성
    const choices = [
        baseIP.replace('.0', `.${networkAddress}`),
        baseIP.replace('.0', `.${usableIP - 1}`),
        answer, // 정답
        baseIP.replace('.0', `.${usableIP + 2}`)
    ];
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `${baseIP}/24 네트워크를 FLSM방식으로 ${subnetCount}개의 Subnet으로 나누고 IP Subnet-zero를 적용했다. 이 때 Subnetting 된 네트워크 중 ${whichNetwork}번째 네트워크의 ${whichIP}번째 사용 가능한 IP는 무엇인가?\n\n1. ${choices[0]}\n2. ${choices[1]}\n3. ${choices[2]}\n4. ${choices[3]}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = answer;
}

// 8번: FLSM N번째 네트워크 브로드캐스트 주소
function generateFLSMBroadcastProblem(categoryIndex) {
    // 기본 네트워크
    const octet1 = 192 + Math.floor(Math.random() * 30);
    const octet2 = Math.floor(Math.random() * 255);
    const octet3 = Math.floor(Math.random() * 255);
    const baseIP = `${octet1}.${octet2}.${octet3}.0`;
    
    // 분할 개수 (8~16개)
    const subnetCount = 8 + Math.floor(Math.random() * 9);
    const subnetBits = Math.ceil(Math.log2(subnetCount));
    
    // 몇 번째 네트워크? (subnetCount - 2 ~ subnetCount)
    const whichNetwork = subnetCount - 2 + Math.floor(Math.random() * 3);
    
    // 블록 크기
    const blockSize = 256 / Math.pow(2, subnetBits);
    
    // N번째 네트워크 브로드캐스트 주소
    const networkStart = (whichNetwork - 1) * blockSize;
    const broadcastIP = networkStart + blockSize - 1;
    
    const answer = baseIP.replace('.0', `.${Math.floor(broadcastIP)}`);
    
    // 선택지 생성
    const choices = [
        answer, // 정답
        baseIP.replace('.0', `.${Math.floor(broadcastIP) - 16}`),
        baseIP.replace('.0', `.${Math.floor(broadcastIP) + 16}`),
        baseIP.replace('.0', `.255`)
    ];
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `${baseIP}/24 네트워크를 FLSM방식을 이용하여 ${subnetCount}개의 Subnet으로 나누고 IP Subnet-zero를 적용했다. 이 때 서브네팅된 네트워크 중 ${whichNetwork}번째 네트워크의 broadcast IP주소는?\n\n1. ${choices[0]}\n2. ${choices[1]}\n3. ${choices[2]}\n4. ${choices[3]}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = answer;
}

// 9번: 사용 가능한 마지막 IP 주소
function generateUsableLastIPProblem(categoryIndex) {
    // 네트워크 주소 생성
    const octet3 = Math.floor(Math.random() * 200) + 50;
    
    // 서브넷 마스크 선택 (/26, /27, /28)
    const maskOptions = [192, 224, 240];
    const mask = maskOptions[Math.floor(Math.random() * maskOptions.length)];
    const blockSize = 256 - mask;
    
    // 네트워크 블록 계산 (128, 192 등)
    const networkBlock = Math.floor(Math.random() * (256 / blockSize)) * blockSize;
    
    const networkIP = `192.168.${octet3}.${networkBlock}`;
    const subnetMask = `255.255.255.${mask}`;
    
    // 브로드캐스트 주소
    const broadcastIP = networkBlock + blockSize - 1;
    // 마지막 사용가능 IP
    const lastUsableIP = broadcastIP - 1;
    
    const answer = `192.168.${octet3}.${lastUsableIP}`;
    
    // 선택지 생성
    const choices = [
        `192.168.${octet3}.${networkBlock + 1}`,
        answer, // 정답
        `192.168.${octet3}.${broadcastIP}`,
        `192.168.${octet3}.255`
    ];
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `네트워크주소가 '${networkIP}'이며, 서브넷마스크가 '${subnetMask}'인 네트워크가 있다. 이 네트워크에서 사용 가능한 마지막 IP주소는 무엇인가?\n\n1. ${choices[0]}\n2. ${choices[1]}\n3. ${choices[2]}\n4. ${choices[3]}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = answer;
}

// 10번: 브로드캐스트 주소 계산
function generateBroadcastAddressProblem(categoryIndex) {
    // IP 주소 생성
    const octet3 = Math.floor(Math.random() * 200) + 50;
    
    // 서브넷 마스크 선택
    const maskOptions = [192, 224, 240];
    const mask = maskOptions[Math.floor(Math.random() * maskOptions.length)];
    const blockSize = 256 - mask;
    
    // 랜덤 IP 생성 (블록 중간에 위치)
    const networkStart = Math.floor(Math.random() * (256 / blockSize)) * blockSize;
    const randomOffset = 10 + Math.floor(Math.random() * (blockSize - 15));
    const ipAddress = networkStart + randomOffset;
    
    // 브로드캐스트 계산
    const broadcastIP = networkStart + blockSize - 1;
    
    const ip = `192.168.${octet3}.${ipAddress}`;
    const subnetMask = `255.255.255.${mask}`;
    const answer = `192.168.${octet3}.${broadcastIP}`;
    
    // 선택지 생성
    const choices = [
        `192.168.${octet3}.255`,
        `192.168.${octet3}.${networkStart + blockSize / 2 - 1}`,
        `192.168.${octet3}.${networkStart + blockSize - 1 - blockSize}`,
        answer // 정답
    ];
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `다음 조건일 때 사용되는 브로드캐스트 주소로 알맞은 것은?\n\nIP주소: ${ip}\n서브넷마스크 값: ${subnetMask}\n\n1. ${choices[0]}\n2. ${choices[1]}\n3. ${choices[2]}\n4. ${choices[3]}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = answer;
}

// 11번: 서브넷 비트 수 계산 (CIDR 표기)
function generateSubnetBitsCountProblem(categoryIndex) {
    // 기본 네트워크
    const baseOctet = 100 + Math.floor(Math.random() * 100);
    const baseIP = `${baseOctet}.${baseOctet}.${baseOctet}.0/24`;
    
    // 필요한 서브넷 개수 (6~14개)
    const requiredSubnets = 6 + Math.floor(Math.random() * 9);
    // 필요한 호스트 개수 (15~25개)
    const requiredHosts = 15 + Math.floor(Math.random() * 11);
    
    // 서브넷 비트 계산
    const subnetBits = Math.ceil(Math.log2(requiredSubnets));
    // 호스트 비트 계산
    const hostBits = Math.ceil(Math.log2(requiredHosts + 2));
    
    // CIDR 표기
    const cidr = 24 + subnetBits;
    const answer = cidr.toString();
    
    // 선택지 생성
    const choices = [
        (cidr - 2).toString(),
        (cidr - 1).toString(),
        answer, // 정답
        (cidr + 1).toString()
    ];
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `네트워크 관리자인 A씨는 ISP로부터 ${baseIP}를 할당 받았다. 네트워크의 효율성을 위하여 최소 ${requiredSubnets}개의 서브넷으로 분리하여 네트워크를 구성하되, 각 네트워크에는 최소 ${requiredHosts}대 이상의 호스트가 존재할 수 있도록 네트워크를 구성하고자 한다. 이 때 사용해야하는 서브넷 비트의 수는 무엇인가?\n\n1. ${choices[0]}\n2. ${choices[1]}\n3. ${choices[2]}\n4. ${choices[3]}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = answer;
}

// 12번: 유효한 서브넷 ID 찾기
function generateValidSubnetIDProblem(categoryIndex) {
    // A클래스 네트워크
    const baseOctet = 10 + Math.floor(Math.random() * 20);
    const baseIP = `${baseOctet}.0.0.0`;
    
    // 서브넷 마스크 선택 (두 번째 옥텟)
    const maskOptions = [240, 248, 224, 192];
    const mask = maskOptions[Math.floor(Math.random() * maskOptions.length)];
    const subnetMask = `255.${mask}.0.0`;
    
    // 블록 크기 계산
    const blockSize = 256 - mask;
    
    // 유효한 서브넷 ID (blockSize의 배수)
    const validMultiple = 1 + Math.floor(Math.random() * 3); // 1~3배
    const validSubnetID = `${baseOctet}.${blockSize * validMultiple}.0.0`;
    
    // 선택지 생성
    const choices = [
        validSubnetID, // 정답
        `${baseOctet}.0.0.${blockSize}`,
        `${baseOctet}.${blockSize - 16}.16.3`,
        `${baseOctet}.${blockSize * 2 - 16}.240.0`
    ];
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `${baseIP} 네트워크 전체에서 마스크 값으로 ${subnetMask}를 사용할 경우 유효한 서브넷 ID는?\n\n1. ${choices[0]}\n2. ${choices[1]}\n3. ${choices[2]}\n4. ${choices[3]}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = validSubnetID;
}

// 13번: 서로 다른 서브넷을 위한 마스크
function generateDifferentSubnetMaskProblem(categoryIndex) {
    // 기본 네트워크
    const baseOctet = 192;
    const secondOctet = 168;
    const thirdOctet = Math.floor(Math.random() * 255);
    
    // 첫 번째 IP (작은 값)
    const firstIP = 1 + Math.floor(Math.random() * 30);
    // 두 번째 IP (큰 값, 32~96 사이)
    const secondIP = 32 + Math.floor(Math.random() * 65);
    
    const ipA = `${baseOctet}.${secondOctet}.${thirdOctet}.${firstIP}`;
    const ipB = `${baseOctet}.${secondOctet}.${thirdOctet}.${secondIP}`;
    
    // 두 IP를 분리할 수 있는 최소 마스크 계산
    const diff = secondIP - firstIP;
    let requiredBlockSize = 32;
    while (requiredBlockSize < diff) {
        requiredBlockSize *= 2;
    }
    
    // 마스크 계산
    const maskValue = 256 - requiredBlockSize;
    const correctMask = `255.255.255.${maskValue}`;
    
    // 선택지 생성
    const choices = [
        `0.0.0.0`,
        `255.255.255.0`,
        correctMask, // 정답
        `255.255.255.${maskValue - 64}`
    ];
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `IPv4주소체계 기반의 어떤 네트워크상에서 두 컴퓨터 A,B가 각각 ${ipA}과 ${ipB}의 주소를 사용할 때 이 두 컴퓨터가 서로 다른 서브넷(Subnet)상에 존재하기 위해 사용해야 하는 서브넷 마스크(subnet Mask)로 가장 옳은 것은?\n\n1. ${choices[0]}\n2. ${choices[1]}\n3. ${choices[2]}\n4. ${choices[3]}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = correctMask;
}

// 배열 섞기 헬퍼 함수
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
// ========================== 서브넷/네트워크 알고리즘 끝 ==========================

// ========================== 페이지 교체 알고리즘 문제 생성 함수들 ==========================

// 1번 문제: 2024년 3회 기출 - LRU 페이지 부재 횟수
function generatePageProblem1(categoryIndex) {
    const frameCount = 3;
    const pages = [];
    
    // 20개의 랜덤 페이지 생성
    for (let i = 0; i < 20; i++) {
        pages.push(Math.floor(Math.random() * 8));
    }
    
    const faults = simulateLRU(pages, frameCount);
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `LRU 페이지 교체 알고리즘에 따른 페이지 부재 횟수를 작성하시오. (프레임 ${frameCount}개)\n\n페이지 참조 순서: ${pages.join(' ')}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = faults.toString();
}

// 2번 문제: 2024년 1회 기출 - LRU와 LFU 비교
function generatePageProblem2(categoryIndex) {
    const frameCount = 3;
    const pages = [];
    
    // 10개의 랜덤 페이지 생성
    for (let i = 0; i < 10; i++) {
        pages.push(Math.floor(Math.random() * 8) + 1);
    }
    
    const lruFaults = simulateLRU(pages, frameCount);
    const lfuFaults = simulateLFU(pages, frameCount);
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `다음은 운영체제 페이지 순서를 참고하여 할당된 프레임의 수가 ${frameCount}개일 때 LRU와 LFU 알고리즘의 페이지 부재 횟수를 작성하시오.\n\n페이지 참조 순서: ${pages.join(', ')}\n\n(1) LRU: \n(2) LFU:`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = 
        `(1) LRU: ${lruFaults}\n(2) LFU: ${lfuFaults}`;
}

// 3번 문제: 연습 문제 - FIFO 페이지 부재 횟수
function generatePageProblem3(categoryIndex) {
    const frameCount = 3;
    const pages = [];
    
    // 12개의 랜덤 페이지 생성
    for (let i = 0; i < 12; i++) {
        pages.push(Math.floor(Math.random() * 6) + 1);
    }
    
    const faults = simulateFIFO(pages, frameCount);
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `FIFO 페이지 교체 알고리즘에 따른 페이지 부재 횟수를 작성하시오. (프레임 ${frameCount}개)\n\n페이지 참조 순서: ${pages.join(' ')}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = faults.toString();
}

// 4번 문제: FIFO 최종상태 ✅ 진짜 제대로 수정
function generatePageProblem4(categoryIndex) {
    const frameCount = 3;
    const pages = [];
    
    // 7개의 랜덤 페이지 생성 (0~4 사이)
    for (let i = 0; i < 7; i++) {
        pages.push(Math.floor(Math.random() * 5));
    }
    
    const result = simulateFIFODetailed(pages, frameCount);
    const finalFrames = result.finalFrames;  // 배열: [2, 4, 3]
    const correctAnswer = finalFrames.join(',');  // "2,4,3"
    
    // 🔥 오답 보기 생성: 정답과 완전히 다른 값들로 만들기
    const wrongChoices = [];
    const maxAttempts = 100;
    let attempts = 0;
    
    while (wrongChoices.length < 3 && attempts < maxAttempts) {
        attempts++;
        
        const wrong = [
            Math.floor(Math.random() * 5),
            Math.floor(Math.random() * 5),
            Math.floor(Math.random() * 5)
        ];
        
        const wrongStr = wrong.join(',');
        
        // 정답과 다르고, 중복도 아닌지 확인
        if (wrongStr !== correctAnswer && !wrongChoices.includes(wrongStr)) {
            wrongChoices.push(wrongStr);
        }
    }
    
    // 충분한 오답 생성 실패 시 강제 생성
    while (wrongChoices.length < 3) {
        const filler = `${Math.floor(Math.random() * 5)},${Math.floor(Math.random() * 5)},${Math.floor(Math.random() * 5)}`;
        if (!wrongChoices.includes(filler) && filler !== correctAnswer) {
            wrongChoices.push(filler);
        }
    }
    
    // ✅ 보기 배열 생성 (정답 + 오답 3개)
    const allChoices = [correctAnswer, wrongChoices[0], wrongChoices[1], wrongChoices[2]];
    
    // 🔥 보기 섞기!
    shuffleArray(allChoices);
    
    // 🔥 섞인 후 정답이 몇 번 보기인지 찾기
    const correctIndex = allChoices.indexOf(correctAnswer) + 1;  // 1, 2, 3, 4 중 하나
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `3개의 페이지 프레임을 갖는 시스템에서 페이지 참조 순서가 ${pages.join(',')} 일 경우 FIFO 알고리즘에 의한 페이지 교체의 경우 프레임의 최종상태는?\n1. ${allChoices[0]}\n2. ${allChoices[1]}\n3. ${allChoices[2]}\n4. ${allChoices[3]}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = correctIndex.toString();
}

// 5번 문제: FIFO 페이지 부재 횟수 ✅ 수정됨
function generatePageProblem5(categoryIndex) {
    const frameCount = 3;
    const pages = [];
    
    // 12개의 랜덤 페이지 생성
    for (let i = 0; i < 12; i++) {
        pages.push(Math.floor(Math.random() * 6) + 1);
    }
    
    const faults = simulateFIFO(pages, frameCount);
    
    // 🔥 정답을 3번 보기에 고정
    const choices = [
        faults - 2,
        faults - 1,
        faults,  // ✅ 정답
        faults + 1
    ];
    
    const correctAnswer = '3';  // ✅ 항상 3번이 정답
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `3개의 페이지 프레임을 가진 기억장치에서 페이지 요청을 다음과 같은 페이지 번호 순으로 요청했을 때 교체 알고리즘으로 FIFO방법을 사용한다면 몇번의 페이지 부재가 발생하는가? (단, 현재 기억장치는 모두 비어 있다고 가정한다.)\n요청된 페이지 번호의 순서 : ${pages.join(',')}\n1. ${choices[0]}번\n2. ${choices[1]}번\n3. ${choices[2]}번\n4. ${choices[3]}번`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = correctAnswer;
}

// 6번 문제: FIFO 페이지 결함 ✅ 수정됨
function generatePageProblem6(categoryIndex) {
    const frameCount = 3;
    const pages = [];
    
    // 9개의 랜덤 페이지 생성
    for (let i = 0; i < 9; i++) {
        pages.push(Math.floor(Math.random() * 6) + 1);
    }
    
    const faults = simulateFIFO(pages, frameCount);
    
    // 🔥 정답을 3번 보기에 고정
    const choices = [
        faults - 2,
        faults - 1,
        faults,  // ✅ 정답
        faults + 1
    ];
    
    const correctAnswer = '3';  // ✅ 항상 3번이 정답
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `3개의 페이지를 수용할 수 있는 주기억장치가 있으며, 초기에는 모두 비어 있다고 가정한다. 다음의 순서로 페이지 참조가 발생할 때, FIFO 페이지 교체 알고리즘을 사용할 경우 몇 번의 페이지 결함이 발생하는가?\n페이지 참조 순서 : ${pages.join(',')}\n1. ${choices[0]}\n2. ${choices[1]}\n3. ${choices[2]}\n4. ${choices[3]}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = correctAnswer;
}

// 7번 문제: LRU 페이지 결함 ✅ 수정됨
function generatePageProblem7(categoryIndex) {
    const frameCount = 3;
    const pages = [];
    
    // 10개의 랜덤 페이지 생성
    for (let i = 0; i < 10; i++) {
        pages.push(Math.floor(Math.random() * 6) + 1);
    }
    
    const faults = simulateLRU(pages, frameCount);
    
    // 🔥 정답을 3번 보기에 고정
    const choices = [
        faults - 2,
        faults - 1,
        faults,  // ✅ 정답
        faults + 1
    ];
    
    const correctAnswer = '3';  // ✅ 항상 3번이 정답
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `3개의 페이지를 수용할 수 있는 주기억장치가 있으며, 초기에는 모두 비어 있다고 가정한다. 다음의 순서로 페이지 참조가 발생할 때, LRU페이지 교체 알고리즘을 사용할 경우 몇 번의 페이지 결함이 발생하는가?\n페이지 참조 순서 : ${pages.join(',')}\n1. ${choices[0]}\n2. ${choices[1]}\n3. ${choices[2]}\n4. ${choices[3]}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = correctAnswer;
}

// 8번 문제: LRU 최종 결과 ✅ 수정됨
function generatePageProblem8(categoryIndex) {
    const frameCount = 3;
    const pages = [];
    
    // 7개의 랜덤 페이지 생성
    for (let i = 0; i < 7; i++) {
        pages.push(Math.floor(Math.random() * 5));
    }
    
    const result = simulateLRUDetailed(pages, frameCount);
    const finalFrames = result.finalFrames.join(',');
    
    // 🔥 정답을 2번 보기에 고정
    const choices = [
        `${pages[0]},${pages[1]},${Math.floor(Math.random() * 5)}`,
        finalFrames,  // ✅ 정답
        `${Math.floor(Math.random() * 5)},${pages[pages.length-1]},${pages[1]}`,
        `${pages[pages.length-2]},${pages[0]},${pages[2]}`
    ];
    
    const correctAnswer = '2';  // ✅ 항상 2번이 정답
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `3개의 페이지 프레임을 갖는 시스템에서 페이지 참조 순서가 ${pages.join(',')} 일 경우 LRU 알고리즘에 의한 페이지 대치의 최종 결과는?\n1. ${choices[0]}\n2. ${choices[1]}\n3. ${choices[2]}\n4. ${choices[3]}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = correctAnswer;
}

// 9번 문제: LRU 4개 프레임 ✅ 수정됨
function generatePageProblem9(categoryIndex) {
    const frameCount = 4;
    const pages = [];
    
    // 9개의 랜덤 페이지 생성
    for (let i = 0; i < 9; i++) {
        pages.push(Math.floor(Math.random() * 6) + 1);
    }
    
    const faults = simulateLRU(pages, frameCount);
    
    // 🔥 정답을 3번 보기에 고정
    const choices = [
        `${faults - 2}회`,
        `${faults - 1}회`,
        `${faults}회`,  // ✅ 정답
        `${faults + 1}회`
    ];
    
    const correctAnswer = '3';  // ✅ 항상 3번이 정답
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `4개의 페이지를 수용할 수 있는 주기억장치가 있으며, 초기에는 모두 비어 있다고 가정한다. 다음의 순서로 페이지 참조가 발생할 때, LRU 페이지 교체 알고리즘을 사용할 경우 몇 번의 페이지 결함이 발생하는가?\n페이지 참조 순서 : ${pages.join(',')}\n1. ${choices[0]}\n2. ${choices[1]}\n3. ${choices[2]}\n4. ${choices[3]}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = correctAnswer;
}

// 10번 문제: LFU 페이지 부재 ✅ 수정됨
function generatePageProblem10(categoryIndex) {
    const frameCount = 3;
    const pages = [];
    
    // 11개의 랜덤 페이지 생성
    for (let i = 0; i < 11; i++) {
        pages.push(Math.floor(Math.random() * 5) + 1);
    }
    
    const faults = simulateLFU(pages, frameCount);
    
    // 🔥 정답을 3번 보기에 고정
    const choices = [
        `${faults - 2}회`,
        `${faults - 1}회`,
        `${faults}회`,  // ✅ 정답
        `${faults + 1}회`
    ];
    
    const correctAnswer = '3';  // ✅ 항상 3번이 정답
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `3개의 페이지 프레임으로 구성된 기억장치에서 다음과 같은 순서대로 페이지 요청이 일어날 때, 페이지 교체 알고리즘으로 LFU를 사용한다면 몇번의 페이지 부재가 발생하는가? (단, 초기 페이지 프레임은 비어있다고 가정한다.)\n요청된 페이지 번호의 순서 : ${pages.join(',')}\n1. ${choices[0]}\n2. ${choices[1]}\n3. ${choices[2]}\n4. ${choices[3]}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = correctAnswer;
}

// 11번 문제: LFU 최종 결과 ✅ 수정됨
function generatePageProblem11(categoryIndex) {
    const frameCount = 4;
    const pages = [];
    
    // 8개의 랜덤 페이지 생성
    for (let i = 0; i < 8; i++) {
        pages.push(Math.floor(Math.random() * 6) + 1);
    }
    
    const result = simulateLFUDetailed(pages, frameCount);
    const finalFrames = result.finalFrames.join(',');
    
    // 🔥 정답을 2번 보기에 고정
    const choices = [
        `${pages[0]},${pages[1]},${pages[2]},${Math.floor(Math.random() * 6) + 1}`,
        finalFrames,  // ✅ 정답
        `${pages[1]},${pages[2]},${Math.floor(Math.random() * 6) + 1},${pages[pages.length-1]}`,
        `${Math.floor(Math.random() * 6) + 1},${pages[2]},${pages[3]},${pages[pages.length-2]}`
    ];
    
    const correctAnswer = '2';  // ✅ 항상 2번이 정답
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `4개의 페이지 프레임으로 구성된 기억장치에서 다음과 같은 순서대로 페이지 요청이 일어날 때, 페이지 교체 알고리즘으로 LFU를 사용한다면 페이지 대치의 최종 결과는?(단, 초기 페이지 프레임은 비어있다고 가정한다.)\n요청된 페이지 번호의 순서 : ${pages.join(',')}\n1. ${choices[0]}\n2. ${choices[1]}\n3. ${choices[2]}\n4. ${choices[3]}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = correctAnswer;
}
// ========================== 페이지 교체 알고리즘 끝 ==========================


// ========================== 프로세스 스케줄링 알고리즘 시작 ==========================

// 2번 문제: SRT 평균 반환시간
function generateProcessSchedule2(categoryIndex) {
    const processCount = 4;
    const processes = [];
    
    for (let i = 0; i < processCount; i++) {
        processes.push({
            name: `P${i + 1}`,
            arrival: i * 2,
            burst: 1 + Math.floor(Math.random() * 7)
        });
    }
    
    const result = simulateSRTScheduling(processes);
    const avgTurnaroundTime = result.avgTurnaround;
    
    const choices = [
        (avgTurnaroundTime - 2.75).toFixed(2),
        avgTurnaroundTime.toFixed(1),
        (avgTurnaroundTime + 1.75).toFixed(2),
        (avgTurnaroundTime + 3).toFixed(1)
    ];
    
    let tableHTML = '<table>\n<tr><th>프로세스</th><th>도착시간</th><th>실행시간</th></tr>\n';
    processes.forEach(p => {
        tableHTML += `<tr><td>${p.name}</td><td>${p.arrival}</td><td>${p.burst}</td></tr>\n`;
    });
    tableHTML += '</table>';
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `다음 표는 단일 CPU에 진입한 프로세스의 도착 시간과 처리하는 데 필요한 실행 시간을 나타낸 것이다. 프로세스 간 문맥 교환에 따른 오버헤드는 무시한다고 할 때, SRT스케줄링 알고리즘을 사용한 경우 네 프로세스의 평균 반환시간은?\n\n${tableHTML}\n\n1. ${choices[0]}\n2. ${choices[1]}\n3. ${choices[2]}\n4. ${choices[3]}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = avgTurnaroundTime.toFixed(1);
}

// 3번 문제: FCFS 평균 대기시간
function generateProcessSchedule3(categoryIndex) {
    const processCount = 3;
    const processes = [];
    
    for (let i = 0; i < processCount; i++) {
        processes.push({
            name: `P${i + 1}`,
            arrival: 0,
            burst: 3 + Math.floor(Math.random() * 20)
        });
    }
    
    const avgWaitTime = simulateFCFS(processes);
    
    const choices = [
        Math.max(0, Math.round(avgWaitTime - 2)),
        Math.max(0, Math.round(avgWaitTime - 1)),
        Math.round(avgWaitTime),
        Math.round(avgWaitTime + 1)
    ];
    
    let tableHTML = '<table>\n<tr><th>프로세스</th><th>버스트 시간(초)</th></tr>\n';
    processes.forEach(p => {
        tableHTML += `<tr><td>${p.name}</td><td>${p.burst}</td></tr>\n`;
    });
    tableHTML += '</table>';
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `다음은 CPU에 서비스를 받으려고 도착한 순서대로 프로세스와 그 서비스 시간을 나타낸다. FCFS CPU Scheduling에 의해서 프로세스를 처리한다고 했을 경우 프로세스의 평균 대기시간은 얼마인가?\n\n${tableHTML}\n\n1. ${choices[0]}\n2. ${choices[1]}\n3. ${choices[2]}\n4. ${choices[3]}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = `${Math.round(avgWaitTime)}`;
}

// 4번 문제: FCFS T-t 값
function generateProcessSchedule4(categoryIndex) {
    const processCount = 3;
    const processes = [];
    
    for (let i = 0; i < processCount; i++) {
        processes.push({
            name: `P${i + 1}`,
            burst: 3 + Math.floor(Math.random() * 10)
        });
    }
    
    const worstOrder = [...processes].sort((a, b) => b.burst - a.burst);
    let timeWorst = 0;
    let totalTurnaroundWorst = 0;
    worstOrder.forEach(p => {
        timeWorst += p.burst;
        totalTurnaroundWorst += timeWorst;
    });
    const T = totalTurnaroundWorst / processCount;
    
    const bestOrder = [...processes].sort((a, b) => a.burst - b.burst);
    let timeBest = 0;
    let totalTurnaroundBest = 0;
    bestOrder.forEach(p => {
        timeBest += p.burst;
        totalTurnaroundBest += timeBest;
    });
    const t = totalTurnaroundBest / processCount;
    
    const diff = Math.round(T - t);
    
    const choices = [
        Math.max(0, diff - 2),
        Math.max(0, diff - 1),
        diff,
        diff + 1
    ];
    
    let tableHTML = '<table>\n<tr><th>프로세스</th><th>실행시간</th></tr>\n';
    processes.forEach(p => {
        tableHTML += `<tr><td>${p.name}</td><td>${p.burst}</td></tr>\n`;
    });
    tableHTML += '</table>';
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `다음과 같은 3개의 작업에 대하여 FCFS 알고리즘을 사용할 때, 임의의 작업 순서로 얻을 수 있는 최대 평균 반환 시간을 T, 최소 평균 반환 시간을 t라고 가정했을 경우 T-t의 값은?\n\n${tableHTML}\n\n1. ${choices[0]}\n2. ${choices[1]}\n3. ${choices[2]}\n4. ${choices[3]}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = `${diff}`;
}

// 5번 문제: SJF 평균 실행시간 (테이블)
function generateProcessSchedule5(categoryIndex) {
    const processCount = 3;
    const processes = [];
    
    for (let i = 0; i < processCount; i++) {
        processes.push({
            name: `P${i + 1}`,
            arrival: 0,
            burst: 6 + Math.floor(Math.random() * 13)
        });
    }
    
    // 평균 실행시간 계산 (실행시간들의 평균)
    let totalBurstTime = 0;
    processes.forEach(p => {
        totalBurstTime += p.burst;
    });
    
    const avgBurstTime = Math.round(totalBurstTime / processCount);
    
    const choices = [
        Math.max(0, avgBurstTime - 1),
        avgBurstTime,
        avgBurstTime + 7,
        avgBurstTime + 13
    ];
    
    let tableHTML = '<table>\n<tr><th>프로세스</th><th>실행시간(초)</th></tr>\n';
    processes.forEach(p => {
        tableHTML += `<tr><td>${p.name}</td><td>${p.burst}</td></tr>\n`;
    });
    tableHTML += '</table>';
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `다음과 같은 프로세스들이 차례로 준비상태 큐에 들어왔을 경우 SJF 스케줄링 기법을 이용하여 제출시간이 없는 경우의 평균 실행시간은?\n\n${tableHTML}\n\n1. ${choices[0]}\n2. ${choices[1]}\n3. ${choices[2]}\n4. ${choices[3]}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = `${avgBurstTime}`;
}

// 6번 문제: SJF 평균 대기시간 (텍스트만, 테이블 없음!)
function generateProcessSchedule6(categoryIndex) {
    const processCount = 4;
    const bursts = [];
    
    for (let i = 0; i < processCount; i++) {
        bursts.push(9 + Math.floor(Math.random() * 16));
    }
    
    const sorted = [...bursts].sort((a, b) => a - b);
    
    let currentTime = 0;
    let totalWaitTime = 0;
    
    sorted.forEach(burst => {
        totalWaitTime += currentTime;
        currentTime += burst;
    });
    
    const avgWaitTime = totalWaitTime / processCount;
    
    const choices = [
        (avgWaitTime - 7).toFixed(1),
        (avgWaitTime - 1).toFixed(1),
        avgWaitTime.toFixed(1),
        (avgWaitTime + 9.75).toFixed(2)
    ];
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `대기하고 있는 프로세스 P1, P2, P3, P4의 처리시간은 ${bursts[0]}[ms], ${bursts[1]}[ms], ${bursts[2]}[ms], ${bursts[3]}[ms]일 때, 최단 작업 우선(SJF) 스케줄링으로 처리했을 때 평균 대기 시간은 얼마인가?\n\n1. ${choices[0]}[ms]\n2. ${choices[1]}[ms]\n3. ${choices[2]}[ms]\n4. ${choices[3]}[ms]`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = avgWaitTime.toFixed(1);
}

// 7번 문제: SJF 평균 반환시간과 평균 대기시간
function generateProcessSchedule7(categoryIndex) {
    const processCount = 4;
    const processes = [];
    
    for (let i = 0; i < processCount; i++) {
        processes.push({
            name: `P-${i + 1}`,
            arrival: 0,
            burst: 3 + Math.floor(Math.random() * 6)
        });
    }
    
    const sorted = [...processes].sort((a, b) => a.burst - b.burst);
    
    let currentTime = 0;
    let totalWaitTime = 0;
    let totalTurnaroundTime = 0;
    
    sorted.forEach(p => {
        totalWaitTime += currentTime;
        currentTime += p.burst;
        totalTurnaroundTime += currentTime;
    });
    
    const avgWaitTime = Math.round(totalWaitTime / processCount);
    const avgTurnaroundTime = Math.round(totalTurnaroundTime / processCount);
    
    let tableHTML = '<table>\n<tr><th>프로세스</th><th>실행시간</th></tr>\n';
    processes.forEach(p => {
        tableHTML += `<tr><td>${p.name}</td><td>${p.burst}</td></tr>\n`;
    });
    tableHTML += '</table>';
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `SJF스케줄링에서 다음과 같은 작업들이 준비상태 큐에 있을 때 평균 반환시간과 평균 대기시간은?\n\n${tableHTML}\n\n1. 평균 반환시간 : ${avgTurnaroundTime}, 평균 대기시간 : ${avgWaitTime}\n2. 평균 반환시간 : ${avgTurnaroundTime}, 평균 대기시간 : ${avgWaitTime + 2}\n3. 평균 반환시간 : ${avgTurnaroundTime + 2}, 평균 대기시간 : ${avgWaitTime}\n4. 평균 반환시간 : ${avgTurnaroundTime + 2}, 평균 대기시간 : ${avgWaitTime + 2}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = `평균 반환시간 : ${avgTurnaroundTime}, 평균 대기시간 : ${avgWaitTime}`;
}

// 8번 문제: SJF Task 종료시간
function generateProcessSchedule8(categoryIndex) {
    const tasks = [];
    
    for (let i = 0; i < 3; i++) {
        tasks.push({
            name: `Task${i + 1}`,
            arrival: i,
            burst: 3 + Math.floor(Math.random() * 4)
        });
    }
    
    const remaining = [...tasks];
    let currentTime = 0;
    let task2EndTime = 0;
    
    while (remaining.length > 0) {
        const available = remaining.filter(t => t.arrival <= currentTime);
        
        if (available.length === 0) {
            currentTime++;
            continue;
        }
        
        available.sort((a, b) => a.burst - b.burst);
        const selected = available[0];
        
        currentTime += selected.burst;
        
        if (selected.name === 'Task2') {
            task2EndTime = currentTime;
        }
        
        const index = remaining.indexOf(selected);
        remaining.splice(index, 1);
    }
    
    const choices = [
        Math.max(0, task2EndTime - 6),
        Math.max(0, task2EndTime - 3),
        task2EndTime,
        task2EndTime + 4
    ];
    
    let tableHTML = '<table>\n<tr><th>Task</th><th>도착시간</th><th>실행시간</th></tr>\n';
    tasks.forEach(t => {
        tableHTML += `<tr><td>${t.name}</td><td>${t.arrival}</td><td>${t.burst}</td></tr>\n`;
    });
    tableHTML += '</table>';
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `다음과 같은 Task List에서 SJF방식으로 Scheduling할 경우 Task 2의 종료 시간을 구하면?\n\n${tableHTML}\n\n1. ${choices[0]}\n2. ${choices[1]}\n3. ${choices[2]}\n4. ${choices[3]}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = `${task2EndTime}`;
}

// 9, 10, 11번 문제: HRN
function generateProcessSchedule9(categoryIndex) {
    generateHRNProblem(categoryIndex);
}

function generateProcessSchedule10(categoryIndex) {
    generateHRNProblem(categoryIndex);
}

function generateProcessSchedule11(categoryIndex) {
    generateHRNProblem(categoryIndex);
}

function generateHRNProblem(categoryIndex) {
    const processCount = 4;
    const processes = [];
    const processNames = ['A', 'B', 'C', 'D'];
    
    for (let i = 0; i < processCount; i++) {
        const waitTime = 5 + Math.floor(Math.random() * 116);
        const serviceTime = 2 + Math.floor(Math.random() * 44);
        
        processes.push({
            name: processNames[i],
            waitTime: waitTime,
            serviceTime: serviceTime,
            priority: (waitTime + serviceTime) / serviceTime
        });
    }
    
    const sorted = [...processes].sort((a, b) => b.priority - a.priority);
    const highestPriority = sorted[0].name;
    
    let tableHTML = '<table>\n<tr><th>작업</th><th>대기시간</th><th>서비스';
    
    if (currentProblemIndex === 8) {
        tableHTML += '시간</th></tr>\n';
    } else {
        tableHTML += '(실행)시간</th></tr>\n';
    }
    
    processes.forEach(p => {
        tableHTML += `<tr><td>${p.name}</td><td>${p.waitTime}</td><td>${p.serviceTime}</td></tr>\n`;
    });
    tableHTML += '</table>';
    
    if (currentProblemIndex === 8) {
        categories[categoryIndex].problems[currentProblemIndex].question = 
            `HRN방식으로 스케줄링 할 경우, 입력된 작업이 다음과 같을 때 우선순위가 가장 높은 작업은?\n\n${tableHTML}\n\n1. A\n2. B\n3. C\n4. D`;
    } else if (currentProblemIndex === 9) {
        categories[categoryIndex].problems[currentProblemIndex].question = 
            `HRN스케줄링 방식에서 입력된 작업이 다음과 같을 때 우선순위가 가장 높은것은?\n\n${tableHTML}\n\n1. A\n2. B\n3. C\n4. D`;
    } else {
        // 11번: 우선순위 순서
        sorted.sort((a, b) => b.priority - a.priority);
        const correctOrder = sorted.map(p => p.name).join(' > ');
        
        // ✅ 오답 보기 3개 생성
        const wrongChoices = [];
        
        // 오답 1: 랜덤 섞기
        const shuffle1 = [...processNames].sort(() => Math.random() - 0.5).join(' > ');
        if (shuffle1 !== correctOrder) wrongChoices.push(shuffle1);
        
        // 오답 2: 역순
        const reverse = [...sorted].reverse().map(p => p.name).join(' > ');
        if (reverse !== correctOrder && !wrongChoices.includes(reverse)) {
            wrongChoices.push(reverse);
        }
        
        // 오답 3: 랜덤 섞기 2
        while (wrongChoices.length < 3) {
            const shuffle = [...processNames].sort(() => Math.random() - 0.5).join(' > ');
            if (shuffle !== correctOrder && !wrongChoices.includes(shuffle)) {
                wrongChoices.push(shuffle);
            }
        }
        
        // ✅ 정답 + 오답 3개를 합쳐서 섞기
        const allChoices = [correctOrder, ...wrongChoices];
        shuffleArray(allChoices);
        
        // ✅ 정답이 몇 번 보기인지 찾기
        const correctIndex = allChoices.indexOf(correctOrder) + 1;
        
        categories[categoryIndex].problems[currentProblemIndex].question = 
            `HRN방식으로 스케줄링 할 경우, 입력된 작업이 다음과 같을 때 우선순위가 높은 순서부터 차례로 옳게 나열한 것은?\n\n${tableHTML}\n\n1. ${allChoices[0]}\n2. ${allChoices[1]}\n3. ${allChoices[2]}\n4. ${allChoices[3]}`;
        
        // ✅ 정답을 보기 번호로 저장
        categories[categoryIndex].problems[currentProblemIndex].answer = correctIndex.toString();
        return;
    }
    
    categories[categoryIndex].problems[currentProblemIndex].answer = highestPriority;
}

// ========================== 프로세스 스케줄링 알고리즘 끝 ==========================

// ========================== 디스크 스케줄링 알고리즘 시작 ==========================

// 1번 문제: FCFS 총 이동거리
function generateDiskSchedule1(categoryIndex) {
    const headStart = 30 + Math.floor(Math.random() * 70);
    const queueSize = 6 + Math.floor(Math.random() * 3);
    const queue = [];
    
    for (let i = 0; i < queueSize; i++) {
        queue.push(Math.floor(Math.random() * 200));
    }
    
    const result = simulateFCFSDisk(headStart, queue);
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `디스크 입/출력 요청 대기 큐에 다음과 같은 순서로 기억되어 있다. 현재 헤드가 ${headStart}에 있을 때, 이들 모두를 처리하기 위한 총 이동거리는 얼마인가?\n\n대기큐: ${queue.join(', ')}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = result.totalDistance.toString();
}

// 2번 문제: SSTF 가장 먼저 처리되는 트랙
function generateDiskSchedule2(categoryIndex) {
    const headStart = 40 + Math.floor(Math.random() * 30);
    const queueSize = 8 + Math.floor(Math.random() * 3);
    const queue = [];
    
    for (let i = 0; i < queueSize; i++) {
        queue.push(Math.floor(Math.random() * 200));
    }
    
    const result = simulateSSTFDisk(headStart, queue);
    const firstTrack = result.order[0];
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `초기 헤드 위치가 ${headStart}이며 트랙 0방향으로 이동중이다. 디스크 대기 큐에 다음과 같은 순서의 액세스 요청이 대기 중일 때 SSTF 스케줄링을 사용하여 모든 처리를 완료하고자 한다. 가장 먼저 처리되는 트랙을 쓰시오.\n(단, 가장 안쪽 트랙 0, 가장 바깥쪽 트랙 200)\n\n대기큐: ${queue.join(', ')}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = firstTrack.toString();
}

// 3번 문제: SSTF 총 헤드 이동거리
function generateDiskSchedule3(categoryIndex) {
    const headStart = 40 + Math.floor(Math.random() * 30);
    const maxTrack = 150;
    const queueSize = 6 + Math.floor(Math.random() * 2);
    const queue = [];
    
    for (let i = 0; i < queueSize; i++) {
        queue.push(Math.floor(Math.random() * maxTrack));
    }
    
    const result = simulateSSTFDisk(headStart, queue);
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `디스크 큐에 다음과 같이 I/O 요청이 들어와 있다. 최소탐색시간 우선(SSTF)스케줄링 적용 시 발생하는 총 헤드 이동 거리를 구하시오.\n(단, 추가 I/O 요청은 없다고 가정한다. 디스크 헤드는 0부터 ${maxTrack}까지 이동 가능하며, 현재 위치는 ${headStart}이다.)\n\n대기큐: ${queue.join(', ')}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = result.totalDistance.toString();
}

// 4번 문제: SSTF 처리 순서
function generateDiskSchedule4(categoryIndex) {
    const headStart = 40 + Math.floor(Math.random() * 30);
    const queueSize = 6 + Math.floor(Math.random() * 3);
    const queue = [];
    
    for (let i = 0; i < queueSize; i++) {
        queue.push(Math.floor(Math.random() * 200));
    }
    
    const result = simulateSSTFDisk(headStart, queue);
    const orderString = `${headStart}-${result.order.join('-')}`;
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `사용자가 요청한 디스크 입,출력 내용이 다음과 같은 순서로 큐에 들어 있을 때 SSTF 스케줄링을 사용한 경우의 처리 순서를 쓰시오.\n(단, 현재 헤드 위치는 ${headStart}이고, 제일 안쪽이 1번, 바깥쪽이 200번 트랙이다.)\n\n대기큐: ${queue.join(', ')}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = orderString;
}

// 5번 문제: SCAN 총 트랙 이동거리
function generateDiskSchedule5(categoryIndex) {
    const headStart = 20 + Math.floor(Math.random() * 30);
    const direction = 'down';
    const queueSize = 4 + Math.floor(Math.random() * 2);
    const queue = [];
    
    for (let i = 0; i < queueSize; i++) {
        queue.push(Math.floor(Math.random() * headStart * 2));
    }
    
    const result = simulateSCANDisk(headStart, queue, direction, 0, 200);
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `디스크 스케줄링에서 SCAN기법을 사용할 경우, 다음과 같은 작업대기 큐의 작업들을 수행하기 위한 헤드의 총 트랙 이동 거리는?\n(단, 초기 헤드의 위치는 ${headStart}이고, 현재 0번 트랙으로 이동 중이다.)\n\n대기큐: ${queue.join(', ')}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = result.totalDistance.toString();
}

// 6번 문제: SCAN 최후 처리 트랙
function generateDiskSchedule6(categoryIndex) {
    const headStart = 40 + Math.floor(Math.random() * 20);
    const direction = 'down';
    const queueSize = 4 + Math.floor(Math.random() * 2);
    const queue = [];
    
    for (let i = 0; i < queueSize; i++) {
        queue.push(Math.floor(Math.random() * 60));
    }
    
    const result = simulateSCANDisk(headStart, queue, direction, 0, 200);
    const lastTrack = result.order[result.order.length - 1];
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `디스크 스케줄링 기법 중 SCAN을 사용하여 다음 작업대기 큐의 작업을 모두 처리하고자 할 경우, 가장 최후에 처리되는 트랙은?\n(단, 현재 디스크 헤드는 ${headStart + 10} 트랙에서 ${headStart}트랙으로 이동해 왔다고 가정한다.)\n\n대기큐: ${queue.join(', ')}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = lastTrack.toString();
}

// 7번 문제: SCAN 가장 먼저 처리되는 트랙
function generateDiskSchedule7(categoryIndex) {
    const headStart = 50 + Math.floor(Math.random() * 30);
    const direction = 'down';
    const queueSize = 4;
    const queue = [];
    
    for (let i = 0; i < queueSize; i++) {
        queue.push(Math.floor(Math.random() * 100));
    }
    
    const result = simulateSCANDisk(headStart, queue, direction, 0, 200);
    const firstTrack = result.order[0];
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `디스크에서 헤드가 ${headStart + 10}트랙을 처리하고 ${headStart}트랙으로 이동해 왔다. 디스크 스케줄링 기법으로 SCAN 방식을 사용할 때 다음 디스크 대기큐에서 가장 먼저 처리되는 트랙은?\n\n대기큐: ${queue.join(', ')}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = firstTrack.toString();
}

// 8번 문제: C-SCAN 처리 순서
function generateDiskSchedule8(categoryIndex) {
    const headStart = 30 + Math.floor(Math.random() * 30);
    const direction = 'up';
    const maxTrack = 199;
    const queueSize = 5 + Math.floor(Math.random() * 2);
    const queue = [];
    
    for (let i = 0; i < queueSize; i++) {
        queue.push(Math.floor(Math.random() * 200));
    }
    
    const result = simulateCSCANDisk(headStart, queue, direction, 0, maxTrack);
    const orderString = result.order.map(t => t.toString()).join(' > ');
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `트랙 번호가 0부터 ${maxTrack}인 ${maxTrack + 1}개의 트랙을 가진 디스크가 있다. 디스크 스케줄링 기법 중 C-SCAN을 사용하여 다음과 같은 작업 대기 큐(디스크 큐)의 작업을 처리하고자 하는 경우 처리되는 트랙의 순서를 바르게 나열하시오.\n(단, 현재 디스크 헤드는 트랙 ${headStart - 12}에서 트랙 ${headStart}로 이동해 왔다고 가정한다.)\n\n대기큐: ${queue.join(', ')}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = `${headStart} > ${orderString}`;
}

// 9번 문제: C-SCAN 총 이동거리
function generateDiskSchedule9(categoryIndex) {
    const headStart = 40 + Math.floor(Math.random() * 20);
    const direction = 'down';
    const queueSize = 8 + Math.floor(Math.random() * 3);
    const queue = [];
    
    for (let i = 0; i < queueSize; i++) {
        queue.push(Math.floor(Math.random() * 200));
    }
    
    const result = simulateCSCANDisk(headStart, queue, direction, 0, 200);
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `현재 헤드의 위치가 ${headStart}에 있고, 요청 대기열의 순서가 다음과 같을 경우 C-SCAN 스케줄링 알고리즘에 의한 헤드의 총 이동거리는 얼마인가?\n(단, 현재 헤드의 이동 방향은 안쪽이며, 안쪽의 위치는 0으로 가정한다.)\n\n대기큐: ${queue.join(', ')}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = result.totalDistance.toString();
}

// 10번 문제: LOOK 가장 먼저 처리되는 트랙
function generateDiskSchedule10(categoryIndex) {
    const headStart = 40 + Math.floor(Math.random() * 30);
    const direction = 'up';
    const queueSize = 4;
    const queue = [];
    
    for (let i = 0; i < queueSize; i++) {
        queue.push(headStart + 10 + Math.floor(Math.random() * 50));
    }
    
    const result = simulateLOOKDisk(headStart, queue, direction);
    const firstTrack = result.order[0];
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `디스크 스케줄링 방법 중 LOOK 방식을 사용할 때 현재 헤드가 ${headStart + 10}에서 ${headStart}으로 이동해 왔다고 가정할 경우 다음과 같은 디스크 큐에서 가장 먼저 처리되는 것은?\n\n대기큐: ${queue.join(', ')}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = firstTrack.toString();
}

// 11번 문제: LOOK 총 헤드 이동
function generateDiskSchedule11(categoryIndex) {
    const headStart = 40 + Math.floor(Math.random() * 20);
    const direction = 'down';
    const queueSize = 4;
    const queue = [];
    
    for (let i = 0; i < queueSize; i++) {
        queue.push(Math.floor(Math.random() * 60));
    }
    
    const result = simulateLOOKDisk(headStart, queue, direction);
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `다음과 같은 트랙이 요청되어 큐에 도착하였다. 모든 트랙을 서비스하기 위하여 LOOK 스케줄링 기법이 사용되었을 때 모두 몇 트랙의 헤드 이동이 생기는가?\n(단, 현재 헤드의 위치는 ${headStart} 트랙이고 헤드는 트랙 0 방향으로 움직이고 있다.)\n\n대기큐: ${queue.join(', ')}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = result.totalDistance.toString();
}

// 12번 문제: C-LOOK 총 이동거리
function generateDiskSchedule12(categoryIndex) {
    const headStart = 40 + Math.floor(Math.random() * 20);
    const direction = 'up';
    const queueSize = 7 + Math.floor(Math.random() * 3);
    const queue = [];
    
    for (let i = 0; i < queueSize; i++) {
        queue.push(Math.floor(Math.random() * 200));
    }
    
    const result = simulateCLOOKDisk(headStart, queue, direction);
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
    `디스크의 서비스 요청 대기 큐에 도착한 요청이 다음과 같을 때 C-LOOK 스케줄링 알고리즘에 의한 헤드의 총 이동거리는 얼마인가?\n(단, 현재 헤드의 위치는 ${headStart}에 있고, 헤드의 이동방향은 0에서 199방향이다.)\n\n대기큐: ${queue.join(', ')}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = result.totalDistance.toString();
}


// ========================== 진법 변환 알고리즘 시작 ==========================
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
// ========================== 진법 변환 알고리즘 끝 ==========================

// ========================== Python 알고리즘 시작 ==========================
function generateRandomPythonProblem(categoryIndex, difficulty) {
    if (difficulty === 1) {
        // 간단한 문제 (레벨 1)
        generateSimplePythonProblem(categoryIndex);
    } else {
        // 복잡한 문제 (레벨 2)
        generateComplexPythonProblem(categoryIndex);
    }
}

// 레벨 1: 간단한 문제 (리스트 슬라이싱, 비트 연산)
function generateSimplePythonProblem(categoryIndex) {
    const problemTypes = ['list_slice', 'bit_operation', 'list_index'];
    const type = problemTypes[Math.floor(Math.random() * problemTypes.length)];
    
    let code = '';
    let answer = '';
    
    if (type === 'list_slice') {
        // 리스트 슬라이싱
        const length = 5 + Math.floor(Math.random() * 3);
        const lst = Array.from({length}, (_, i) => i + 1);
        const step = [1, 2, -1][Math.floor(Math.random() * 3)];
        
        const sliceTypes = [
            { slice: '[::2]', calc: lst.filter((_, i) => i % 2 === 0) },
            { slice: '[1::2]', calc: lst.filter((_, i) => i % 2 === 1) },
            { slice: '[::-1]', calc: [...lst].reverse() },
            { slice: '[::2]', calc: lst.filter((_, i) => i % 2 === 0) }
        ];
        
        const selected = sliceTypes[Math.floor(Math.random() * sliceTypes.length)];
        
        code = `lst = ${JSON.stringify(lst)}\nprint(sum(lst${selected.slice}))`;
        answer = selected.calc.reduce((a, b) => a + b, 0).toString();
        
    } else if (type === 'bit_operation') {
        // 비트 연산
        const num = 10 + Math.floor(Math.random() * 90);
        const shift = 1 + Math.floor(Math.random() * 3);
        
        const operations = [
            { op: '>>', calc: num >> shift, symbol: '>>' },
            { op: '<<', calc: num << shift, symbol: '<<' }
        ];
        
        const selected = operations[Math.floor(Math.random() * operations.length)];
        
        code = `a = ${num}\nresult = a ${selected.symbol} ${shift}\nprint(result)`;
        answer = selected.calc.toString();
        
    } else {
        // 리스트 인덱싱
        const length = 5 + Math.floor(Math.random() * 3);
        const lst = Array.from({length}, (_, i) => (i + 1) * 10);
        const index = Math.floor(Math.random() * length);
        
        code = `lst = ${JSON.stringify(lst)}\nprint(lst[${index}])`;
        answer = lst[index].toString();
    }
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `다음 Python 코드의 출력값을 작성하시오.\n\n${code}`;
    categories[categoryIndex].problems[currentProblemIndex].answer = answer;
}

// 레벨 2: 복잡한 문제 (반복문, 함수)
function generateComplexPythonProblem(categoryIndex) {
    const problemTypes = ['loop_sum', 'function_call', 'list_comprehension'];
    const type = problemTypes[Math.floor(Math.random() * problemTypes.length)];
    
    let code = '';
    let answer = '';
    
    if (type === 'loop_sum') {
        // 반복문 합계
        const start = Math.floor(Math.random() * 3);
        const end = 5 + Math.floor(Math.random() * 5);
        
        let sum = 0;
        for (let i = start; i < end; i++) {
            sum += i;
        }
        
        code = `result = 0\nfor i in range(${start}, ${end}):\n    result += i\nprint(result)`;
        answer = sum.toString();
        
    } else if (type === 'function_call') {
        // 함수 호출
        const a = 5 + Math.floor(Math.random() * 15);
        const b = 5 + Math.floor(Math.random() * 15);
        const defaultVal = 10 + Math.floor(Math.random() * 10);
        
        const useDefault = Math.random() > 0.5;
        
        if (useDefault) {
            code = `def add(x, y=${defaultVal}):\n    return x + y\n\nprint(add(${a}))`;
            answer = (a + defaultVal).toString();
        } else {
            code = `def add(x, y=${defaultVal}):\n    return x + y\n\nprint(add(${a}, ${b}))`;
            answer = (a + b).toString();
        }
        
    } else {
        // 리스트 + 반복문
        const length = 4 + Math.floor(Math.random() * 4);
        const lst = Array.from({length}, (_, i) => (i + 1) * 2);
        
        let result = 0;
        for (let num of lst) {
            if (num % 4 === 0) {
                result += num;
            }
        }
        
        code = `lst = ${JSON.stringify(lst)}\nresult = 0\nfor num in lst:\n    if num % 4 == 0:\n        result += num\nprint(result)`;
        answer = result.toString();
    }
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `다음 Python 코드의 출력값을 작성하시오.\n\n${code}`;
    categories[categoryIndex].problems[currentProblemIndex].answer = answer;
}
// ========================== Python 알고리즘 끝 ==========================

// ========================== C언어 알고리즘 시작 ==========================
function generateRandomCProblem(categoryIndex) {
    const problemTypes = ['loop', 'array', 'pointer', 'conditional'];
    const type = problemTypes[Math.floor(Math.random() * problemTypes.length)];
    
    let code = '';
    let answer = '';
    
    if (type === 'loop') {
        // 반복문 문제
        const start = Math.floor(Math.random() * 3);
        const end = 5 + Math.floor(Math.random() * 6);
        
        let sum = 0;
        for (let i = start; i <= end; i++) {
            sum += i;
        }
        
        code = `#include <stdio.h>\\n\\nint main() {\\n  int sum = 0;\\n  for(int i = ${start}; i <= ${end}; i++) {\\n    sum += i;\\n  }\\n  printf(\\\"%d\\\", sum);\\n  return 0;\\n}`;
        answer = sum.toString();
        
    } else if (type === 'array') {
        // 배열 문제
        const length = 4 + Math.floor(Math.random() * 4);
        const arr = Array.from({length}, (_, i) => (i + 1) * 10);
        const sum = arr.reduce((a, b) => a + b, 0);
        
        code = `#include <stdio.h>\\n\\nint main() {\\n  int arr[] = {${arr.join(', ')}};\\n  int sum = 0;\\n  for(int i = 0; i < ${length}; i++) {\\n    sum += arr[i];\\n  }\\n  printf(\\\"%d\\\", sum);\\n  return 0;\\n}`;
        answer = sum.toString();
        
    } else if (type === 'pointer') {
        // 포인터 문제
        const a = 10 + Math.floor(Math.random() * 20);
        const b = 10 + Math.floor(Math.random() * 20);
        
        code = `#include <stdio.h>\\n\\nint main() {\\n  int a = ${a};\\n  int *p = &a;\\n  *p = ${b};\\n  printf(\\\"%d\\\", a);\\n  return 0;\\n}`;
        answer = b.toString();
        
    } else {
        // 조건문 문제
        const a = 5 + Math.floor(Math.random() * 10);
        const b = 5 + Math.floor(Math.random() * 10);
        const result = a > b ? a * 2 : b * 2;
        
        code = `#include <stdio.h>\\n\\nint main() {\\n  int a = ${a};\\n  int b = ${b};\\n  int c = (a > b) ? a * 2 : b * 2;\\n  printf(\\\"%d\\\", c);\\n  return 0;\\n}`;
        answer = result.toString();
    }
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `다음 C언어 코드의 출력값을 작성하시오.\\n\\n${code}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = answer;
}
// ========================== C언어 알고리즘 끝 ==========================

// ========================== C언어 세분화 알고리즘 시작 ==========================
function generateCategorizedCProblem(categoryIndex, selectedType) {
    let code = '';
    let answer = '';
    
    // ========== 정렬 알고리즘 ==========
    if (selectedType === 'selectionSort') {
        const arr = Array.from({length: 5}, () => Math.floor(Math.random() * 50) + 10);
        const sorted = [...arr].sort((a, b) => a - b);
        
        code = `#include <stdio.h>\\n\\nint main() {\\n  int arr[] = {${arr.join(', ')}};\\n  int i, j, min, temp;\\n  for(i = 0; i < 4; i++) {\\n    min = i;\\n    for(j = i + 1; j < 5; j++) {\\n      if(arr[j] < arr[min])\\n        min = j;\\n    }\\n    temp = arr[i];\\n    arr[i] = arr[min];\\n    arr[min] = temp;\\n  }\\n  for(i = 0; i < 5; i++)\\n    printf(\\\"%d \\\", arr[i]);\\n  return 0;\\n}`;
        answer = sorted.join(' ');
    }
    
    else if (selectedType === 'bubbleSort') {
        const arr = Array.from({length: 5}, () => Math.floor(Math.random() * 50) + 10);
        const sorted = [...arr].sort((a, b) => a - b);
        
        code = `#include <stdio.h>\\n\\nint main() {\\n  int arr[] = {${arr.join(', ')}};\\n  int i, j, temp;\\n  for(i = 0; i < 4; i++) {\\n    for(j = 0; j < 4 - i; j++) {\\n      if(arr[j] > arr[j+1]) {\\n        temp = arr[j];\\n        arr[j] = arr[j+1];\\n        arr[j+1] = temp;\\n      }\\n    }\\n  }\\n  for(i = 0; i < 5; i++)\\n    printf(\\\"%d \\\", arr[i]);\\n  return 0;\\n}`;
        answer = sorted.join(' ');
    }
    
    else if (selectedType === 'insertionSort') {
        const arr = Array.from({length: 5}, () => Math.floor(Math.random() * 50) + 10);
        const sorted = [...arr].sort((a, b) => a - b);
        
        code = `#include <stdio.h>\\n\\nint main() {\\n  int arr[] = {${arr.join(', ')}};\\n  int i, j, key;\\n  for(i = 1; i < 5; i++) {\\n    key = arr[i];\\n    j = i - 1;\\n    while(j >= 0 && arr[j] > key) {\\n      arr[j+1] = arr[j];\\n      j--;\\n    }\\n    arr[j+1] = key;\\n  }\\n  for(i = 0; i < 5; i++)\\n    printf(\\\"%d \\\", arr[i]);\\n  return 0;\\n}`;
        answer = sorted.join(' ');
    }
    
    // ========== 연산 ==========
    else if (selectedType === 'logicalOp') {
        const a = Math.floor(Math.random() * 10) + 5;
        const b = Math.floor(Math.random() * 10) + 5;
        const result = (a > 10 && b > 10) ? 1 : (a > 5 || b > 5) ? 2 : 0;
        
        code = `#include <stdio.h>\\n\\nint main() {\\n  int a = ${a}, b = ${b};\\n  int result;\\n  if(a > 10 && b > 10)\\n    result = 1;\\n  else if(a > 5 || b > 5)\\n    result = 2;\\n  else\\n    result = 0;\\n  printf(\\\"%d\\\", result);\\n  return 0;\\n}`;
        answer = result.toString();
    }
    
    else if (selectedType === 'bitOp') {
        const a = Math.floor(Math.random() * 16) + 10;
        const shift = Math.floor(Math.random() * 2) + 1;
        const result = a << shift;
        
        code = `#include <stdio.h>\\n\\nint main() {\\n  int a = ${a};\\n  int result = a << ${shift};\\n  printf(\\\"%d\\\", result);\\n  return 0;\\n}`;
        answer = result.toString();
    }
    
    // ========== 조건문 ==========
    else if (selectedType === 'ifStmt') {
        const a = Math.floor(Math.random() * 20) + 10;
        const b = Math.floor(Math.random() * 20) + 10;
        const result = a > b ? a * 2 : b * 2;
        
        code = `#include <stdio.h>\\n\\nint main() {\\n  int a = ${a}, b = ${b};\\n  int result;\\n  if(a > b)\\n    result = a * 2;\\n  else\\n    result = b * 2;\\n  printf(\\\"%d\\\", result);\\n  return 0;\\n}`;
        answer = result.toString();
    }
    
    else if (selectedType === 'switchStmt') {
        const num = Math.floor(Math.random() * 5) + 1;
        let result = 0;
        switch(num) {
            case 1: result = 10; break;
            case 2: result = 20; break;
            case 3: result = 30; break;
            case 4: result = 40; break;
            default: result = 50;
        }
        
        code = `#include <stdio.h>\\n\\nint main() {\\n  int num = ${num};\\n  int result;\\n  switch(num) {\\n    case 1: result = 10; break;\\n    case 2: result = 20; break;\\n    case 3: result = 30; break;\\n    case 4: result = 40; break;\\n    default: result = 50;\\n  }\\n  printf(\\\"%d\\\", result);\\n  return 0;\\n}`;
        answer = result.toString();
    }
    
    // ========== 반복문 ==========
    else if (selectedType === 'forLoop') {
        const start = Math.floor(Math.random() * 3);
        const end = 5 + Math.floor(Math.random() * 6);
        let sum = 0;
        for(let i = start; i <= end; i++) sum += i;
        
        code = `#include <stdio.h>\\n\\nint main() {\\n  int sum = 0;\\n  for(int i = ${start}; i <= ${end}; i++) {\\n    sum += i;\\n  }\\n  printf(\\\"%d\\\", sum);\\n  return 0;\\n}`;
        answer = sum.toString();
    }
    
    else if (selectedType === 'whileLoop') {
        const limit = 5 + Math.floor(Math.random() * 6);
        let sum = 0, i = 0;
        while(i <= limit) {
            sum += i;
            i++;
        }
        
        code = `#include <stdio.h>\\n\\nint main() {\\n  int sum = 0, i = 0;\\n  while(i <= ${limit}) {\\n    sum += i;\\n    i++;\\n  }\\n  printf(\\\"%d\\\", sum);\\n  return 0;\\n}`;
        answer = sum.toString();
    }
    
    else if (selectedType === 'doWhile') {
        const limit = 3 + Math.floor(Math.random() * 5);
        let sum = 0, i = 1;
        do {
            sum += i;
            i++;
        } while(i <= limit);
        
        code = `#include <stdio.h>\\n\\nint main() {\\n  int sum = 0, i = 1;\\n  do {\\n    sum += i;\\n    i++;\\n  } while(i <= ${limit});\\n  printf(\\\"%d\\\", sum);\\n  return 0;\\n}`;
        answer = sum.toString();
    }
    
    else if (selectedType === 'breakContinue') {
        let sum = 0;
        for(let i = 1; i <= 10; i++) {
            if(i % 2 === 1) continue;
            sum += i;
        }
        
        code = `#include <stdio.h>\\n\\nint main() {\\n  int sum = 0;\\n  for(int i = 1; i <= 10; i++) {\\n    if(i % 2 == 1)\\n      continue;\\n    sum += i;\\n  }\\n  printf(\\\"%d\\\", sum);\\n  return 0;\\n}`;
        answer = sum.toString();
    }
    
    else if (selectedType === 'nestedLoop') {
        const n = 3 + Math.floor(Math.random() * 2);
        let sum = 0;
        for(let i = 1; i <= n; i++) {
            for(let j = 1; j <= n; j++) {
                sum += i * j;
            }
        }
        
        code = `#include <stdio.h>\\n\\nint main() {\\n  int sum = 0;\\n  for(int i = 1; i <= ${n}; i++) {\\n    for(int j = 1; j <= ${n}; j++) {\\n      sum += i * j;\\n    }\\n  }\\n  printf(\\\"%d\\\", sum);\\n  return 0;\\n}`;
        answer = sum.toString();
    }
    
    // ========== 배열 & 포인터 ==========
    else if (selectedType === 'array') {
        const len = 4 + Math.floor(Math.random() * 3);
        const arr = Array.from({length: len}, (_, i) => (i + 1) * 10);
        const sum = arr.reduce((a, b) => a + b, 0);
        
        code = `#include <stdio.h>\\n\\nint main() {\\n  int arr[] = {${arr.join(', ')}};\\n  int sum = 0;\\n  for(int i = 0; i < ${len}; i++) {\\n    sum += arr[i];\\n  }\\n  printf(\\\"%d\\\", sum);\\n  return 0;\\n}`;
        answer = sum.toString();
    }
    
    else if (selectedType === 'pointer') {
        const a = 10 + Math.floor(Math.random() * 30);
        const b = 20 + Math.floor(Math.random() * 30);
        
        code = `#include <stdio.h>\\n\\nint main() {\\n  int a = ${a};\\n  int *p = &a;\\n  *p = ${b};\\n  printf(\\\"%d\\\", a);\\n  return 0;\\n}`;
        answer = b.toString();
    }
    
    else if (selectedType === 'arrayPointer') {
        const arr = [10, 20, 30, 40];
        const idx = Math.floor(Math.random() * 3) + 1;
        
        code = `#include <stdio.h>\\n\\nint main() {\\n  int arr[] = {${arr.join(', ')}};\\n  int *p = arr;\\n  printf(\\\"%d\\\", *(p + ${idx}));\\n  return 0;\\n}`;
        answer = arr[idx].toString();
    }
    
    else if (selectedType === 'array2d') {
        const sum = 1 + 5 + 9;
        
        code = `#include <stdio.h>\\n\\nint main() {\\n  int arr[3][3] = {{1,2,3},{4,5,6},{7,8,9}};\\n  int sum = 0;\\n  for(int i = 0; i < 3; i++) {\\n    sum += arr[i][i];\\n  }\\n  printf(\\\"%d\\\", sum);\\n  return 0;\\n}`;
        answer = sum.toString();
    }
    
    else if (selectedType === 'pointerArray') {
        const a = 10, b = 20, c = 30;
        
        code = `#include <stdio.h>\\n\\nint main() {\\n  int a = ${a}, b = ${b}, c = ${c};\\n  int *arr[3] = {&a, &b, &c};\\n  printf(\\\"%d\\\", *arr[1] + *arr[2]);\\n  return 0;\\n}`;
        answer = (b + c).toString();
    }
    
    // ========== 구조체 ==========
    else if (selectedType === 'struct') {
        const age = 15 + Math.floor(Math.random() * 10);
        const score = 70 + Math.floor(Math.random() * 30);
        
        code = `#include <stdio.h>\\n\\nstruct Student {\\n  int age;\\n  int score;\\n};\\n\\nint main() {\\n  struct Student s;\\n  s.age = ${age};\\n  s.score = ${score};\\n  printf(\\\"%d\\\", s.age + s.score);\\n  return 0;\\n}`;
        answer = (age + score).toString();
    }
    
    else if (selectedType === 'arrayPointerStruct') {
        const scores = [80, 90, 100];
        const sum = scores.reduce((a, b) => a + b, 0);
        
        code = `#include <stdio.h>\\n\\nstruct Student {\\n  int score[3];\\n};\\n\\nint main() {\\n  struct Student s;\\n  s.score[0] = ${scores[0]};\\n  s.score[1] = ${scores[1]};\\n  s.score[2] = ${scores[2]};\\n  int sum = 0;\\n  for(int i = 0; i < 3; i++)\\n    sum += s.score[i];\\n  printf(\\\"%d\\\", sum);\\n  return 0;\\n}`;
        answer = sum.toString();
    }
    
    // ========== 함수 ==========
    else if (selectedType === 'function') {
        const a = 5 + Math.floor(Math.random() * 10);
        const b = 5 + Math.floor(Math.random() * 10);
        
        code = `#include <stdio.h>\\n\\nint add(int x, int y) {\\n  return x + y;\\n}\\n\\nint main() {\\n  printf(\\\"%d\\\", add(${a}, ${b}));\\n  return 0;\\n}`;
        answer = (a + b).toString();
    }
    
    else if (selectedType === 'functionLoop') {
        const n = 3 + Math.floor(Math.random() * 4);
        let sum = 0;
        for(let i = 1; i <= n; i++) sum += i;
        
        code = `#include <stdio.h>\\n\\nint sumN(int n) {\\n  int sum = 0;\\n  for(int i = 1; i <= n; i++)\\n    sum += i;\\n  return sum;\\n}\\n\\nint main() {\\n  printf(\\\"%d\\\", sumN(${n}));\\n  return 0;\\n}`;
        answer = sum.toString();
    }
    
    else if (selectedType === 'functionAddress') {
        const a = 5, b = 10;
        
        code = `#include <stdio.h>\\n\\nvoid swap(int *x, int *y) {\\n  int temp = *x;\\n  *x = *y;\\n  *y = temp;\\n}\\n\\nint main() {\\n  int a = ${a}, b = ${b};\\n  swap(&a, &b);\\n  printf(\\\"%d %d\\\", a, b);\\n  return 0;\\n}`;
        answer = `${b} ${a}`;
    }
    
    else if (selectedType === 'functionScope') {
        const global = 100;
        const local = 50;
        
        code = `#include <stdio.h>\\n\\nint g = ${global};\\n\\nvoid func() {\\n  int g = ${local};\\n  printf(\\\"%d \\\", g);\\n}\\n\\nint main() {\\n  func();\\n  printf(\\\"%d\\\", g);\\n  return 0;\\n}`;
        answer = `${local} ${global}`;
    }
    
    else if (selectedType === 'functionReturnAddress') {
        const arr = [10, 20, 30];
        const idx = Math.floor(Math.random() * 3);
        
        code = `#include <stdio.h>\\n\\nint* getElement(int arr[], int idx) {\\n  return &arr[idx];\\n}\\n\\nint main() {\\n  int arr[] = {${arr.join(', ')}};\\n  int *p = getElement(arr, ${idx});\\n  printf(\\\"%d\\\", *p);\\n  return 0;\\n}`;
        answer = arr[idx].toString();
    }
    
    else if (selectedType === 'staticVar') {
        let count = 0;
        for(let i = 0; i < 3; i++) count++;
        
        code = `#include <stdio.h>\\n\\nvoid counter() {\\n  static int count = 0;\\n  count++;\\n  printf(\\\"%d \\\", count);\\n}\\n\\nint main() {\\n  counter();\\n  counter();\\n  counter();\\n  return 0;\\n}`;
        answer = '1 2 3';
    }
    
    else if (selectedType === 'recursion') {
        const n = 3 + Math.floor(Math.random() * 3);
        let fact = 1;
        for(let i = 1; i <= n; i++) fact *= i;
        
        code = `#include <stdio.h>\\n\\nint factorial(int n) {\\n  if(n <= 1) return 1;\\n  return n * factorial(n - 1);\\n}\\n\\nint main() {\\n  printf(\\\"%d\\\", factorial(${n}));\\n  return 0;\\n}`;
        answer = fact.toString();
    }
    
    else if (selectedType === 'multiRecursion') {
        const n = 5 + Math.floor(Math.random() * 3);
        function fib(n) {
            if(n <= 1) return n;
            return fib(n-1) + fib(n-2);
        }
        
        code = `#include <stdio.h>\\n\\nint fibonacci(int n) {\\n  if(n <= 1) return n;\\n  return fibonacci(n-1) + fibonacci(n-2);\\n}\\n\\nint main() {\\n  printf(\\\"%d\\\", fibonacci(${n}));\\n  return 0;\\n}`;
        answer = fib(n).toString();
    }
    
    // ========== 기타 ==========
    else {
        const a = 5, b = 10;
        
        code = `#include <stdio.h>\\n\\nint main() {\\n  int a = ${a}, b = ${b};\\n  printf(\\\"%d %d\\\", a++, ++b);\\n  return 0;\\n}`;
        answer = `${a} ${b + 1}`;
    }
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `다음 C언어 코드의 출력값을 작성하시오.\\n\\n${code}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = answer;
}
// ========================== C언어 세분화 알고리즘 끝 ==========================